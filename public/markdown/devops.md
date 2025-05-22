# Codebase Overview

This codebase is designed to automate the creation and configuration of virtual machines (VMs) on both Amazon Web Services (AWS) and Microsoft Azure. It also includes scripts for deploying Docker containers onto these VMs.

---

## Configuration File

### `configurations.json`

This JSON file is the central configuration hub for the entire codebase. It defines the instances to be created and the Docker containers to be deployed on them.

-   **`Instances`**: An array of objects, where each object specifies:
    -   `platform`: The cloud platform ("aws" or "azure").
    -   `instance_name`: A user-defined name for the instance.
    -   `VM_name`: The AMI ID (for AWS) or the URN alias (for Azure) of the VM image.
    -   `VM_size`: The instance type or size (e.g., "t2.micro", "Standard_B1s").
    -   `storage`: Indicates if additional storage is needed ("Y" or "N").
    -   `storage_type` (AWS only): The type of storage (e.g., "EBS").
    -   `storage_size`: The size of the storage in GB.
    -   `ssh_file` (AWS only): The name of the SSH key file.
-   **`Containers`**: An array of objects, where each object specifies:
    -   `instance_name`: The name of the instance where the container will be deployed (should match an `instance_name` from the `Instances` array).
    -   `docker_name`: The name of the Docker image (e.g., "golang", "swift").
    -   `registry`: The Docker registry where the image is located (e.g., "library").
    -   `background`: Whether the Docker container should run in detached mode ("Y" or "N").

---

## AWS Scripts

### `ec2_create_key.py`

This Python script uses the `boto3` library to interact with AWS.

-   **Purpose**: To create a new EC2 key pair.
-   **Functionality**:
    -   It initializes an EC2 resource client for the 'us-east-1' region.
    -   It calls `ec2.create_key_pair` with the name 'ec2-1-keypair'.
    -   The generated private key material is then saved to a local file named `ec2-1-keypair.pem`.

### `ec2_create_instances.py`

This Python script provisions EC2 instances on AWS and deploys Docker containers to them based on the `configurations.json` file.

-   **Purpose**: To automate the creation of EC2 instances and the setup of Docker containers on them.
-   **Functionality**:
    -   Initializes an EC2 resource client for the 'us-east-1' region.
    -   Prompts the user for their Docker password.
    -   Reads instance configurations from `configurations.json`.
    -   For each instance specified for the "aws" platform:
        -   Prints instance details.
        -   Creates the EC2 instance using `ec2.create_instances`.
            -   If `storage` is "Y", it configures block device mappings for additional EBS storage.
            -   Sets tags for the instance, including a 'Name' tag with the `instance_name`.
        -   Waits for the instance to be in a 'running' state.
        -   Reads container configurations from `configurations.json` that match the current `instance_name`.
        -   For each matching container:
            -   Determines the Docker command (`run -td` for background "Y", `pull` otherwise).
            -   Constructs the full Docker image name (`registry/docker_name`).
            -   Retrieves the instance's public DNS name.
            -   Determines the appropriate package manager commands (`updateCommand`, `installCommand`) and SSH username (`dnsname`) based on the AMI ID (`VM_name`). Supported AMIs include Amazon Linux, SUSE, Ubuntu, and Red Hat.
            -   Executes the `load-docker.sh` script via `subprocess.call` to install Docker and run/pull the specified container on the EC2 instance.
    -   Includes helper functions like `show_instances` to display pending and running instances.

### `load-docker.sh`

This shell script is executed remotely on AWS EC2 instances.

-   **Purpose**: To install Docker, log in to Docker Hub, and run/pull a specified Docker container on an AWS EC2 instance.
-   **Functionality**:

    -   It takes five arguments:
        1.  `$1`: SSH connection string (e.g., `ec2-user@ec2-xx-xx-xx-xx.compute-1.amazonaws.com`).
        2.  `$2`: System update command (e.g., `yum update -y`, `apt update`).
        3.  `$3`: Docker installation command (e.g., `yum install docker -y`, `apt install docker.io -y`).
        4.  `$4`: Docker Hub password.
        5.  `$5`: Docker command to execute (e.g., `run -td library/golang`, `pull library/gcc`).
    -   It connects to the specified EC2 instance via SSH using the `ec2-1-keypair.pem` key.
    -   It executes a series of commands on the remote instance:

        -   Runs the system update command (`sudo $2`).
        -   Runs the Docker installation command (`sudo $3`).
        -   Starts the Docker service (`sudo service docker start`).
        -   Logs in to Docker Hub (`sudo docker login -u traczs -p $4`).
        -   Executes the specified Docker command (`sudo docker $5`).

    -   The script contains commented-out examples for different Linux distributions (Amazon Linux 2, SUSE, Ubuntu, Amazon Linux AMI, Red Hat).

---

## Azure Scripts

### `az_makeVM.sh`

This shell script creates a virtual machine in Azure.

-   **Purpose**: To provision a new Azure VM.
-   **Functionality**:
    -   It uses the Azure CLI (`az`) to create a VM.
    -   It takes up to five arguments:
        1.  `$1`: The name of the VM.
        2.  `$2`: The image URN for the VM.
        3.  `$3`: The size of the VM.
        4.  `$4` (optional): Additional arguments, typically for data disk configuration.
        5.  `$5` (optional): Additional arguments.
    -   It creates the VM in the `cis4010_rg` resource group and `canadacentral` location.
    -   It automatically generates SSH keys for the new VM.

### `az_create_instances.py`

This Python script provisions Azure VMs and deploys Docker containers to them based on `configurations.json`.

-   **Purpose**: To automate the creation of Azure VMs and the setup of Docker containers on them.
-   **Functionality**:
    -   Prompts the user for their Docker password.
    -   Reads instance configurations from `configurations.json`.
    -   For each instance specified for the "azure" platform:
        -   Prints instance and VM names.
        -   Constructs a call string to `az_makeVM.sh` with the instance name, VM image, and VM size.
        -   If `storage` is "Y", it appends data disk size arguments to the call string.
        -   Executes `az_makeVM.sh` using `subprocess.call`.
        -   Reads container configurations from `configurations.json` that match the current `instance_name`.
        -   For each matching container:
            -   Determines the Docker command (`run -td` for background "Y", `pull` otherwise).
            -   Constructs the full Docker image name (`registry/docker_name`).
            -   Retrieves the public IP address of the VM using `az vm show` and saves it to `tempAZ.json`.
            -   Constructs the SSH connection string (`dnsname`) using "sam@" and the public IP.
            -   Defines `updateCommand` as "apt update" and `installCommand` as "apt install docker.io -y".
            -   Introduces a `time.sleep(15)` delay.
            -   Constructs a call string to `az-docker.sh` with the SSH connection string, update command, install command, Docker password, and Docker run/pull command.
            -   Calls the `installDocker` function, which in turn calls `az-docker.sh` via `subprocess.call` with a timeout of 300 seconds. Includes a try-except block to retry `installDocker` on failure.
            -   Removes the temporary `tempAZ.json` file.

### `az-docker.sh`

This shell script is executed remotely on Azure VMs.

-   **Purpose**: To install Docker, log in to Docker Hub, and run/pull a specified Docker container on an Azure VM.
-   **Functionality**:
    -   It takes five arguments:
        1.  `$1`: SSH connection string (e.g., `sam@<public_ip>`).
        2.  `$2`: System update command (e.g., `apt update`).
        3.  `$3`: Docker installation command (e.g., `apt install docker.io -y`).
        4.  `$4`: Docker Hub password.
        5.  `$5`: Docker command to execute (e.g., `run -td library/swift`).
    -   It connects to the specified Azure VM via SSH.
    -   It executes a series of commands on the remote instance in a single SSH session:
        -   Runs the system update command (`sudo $2`).
        -   Runs the Docker installation command (`sudo $3`).
        -   Starts the Docker service (`sudo service docker start`).
        -   Logs in to Docker Hub (`sudo docker login -u traczs -p $4`).
        -   Executes the specified Docker command (`sudo docker $5`).
    -   The script has commented-out lines suggesting it previously ran these commands in separate SSH sessions.

---

## Monitoring Script

### `monitor.py`

This Python script checks the status of Docker containers on both AWS and Azure VMs.

-   **Purpose**: To display information about running VMs and the Docker images/containers on them.
-   **Functionality**:
    -   **AWS Monitoring**:
        -   Initializes an EC2 resource client.
        -   Filters for running EC2 instances.
        -   For each running instance:
            -   Prints instance details (ID, type, image ID, public IP, VPC ID).
            -   Determines the SSH username (`ubuntu@` or `ec2-user@`) based on the `image_id`.
            -   Constructs an SSH command string to connect to the instance using `ec2-1-keypair.pem`.
            -   The remote command lists installed Docker images (`sudo docker images`), running containers (`sudo docker ps`), and all containers (`sudo docker ps -a`).
            -   Executes the SSH command using `subprocess.call`.
    -   **Azure Monitoring**:
        -   Lists running Azure VMs using `az vm list -d --query "[?powerState=='VM running']"` and saves the output to `tempAZ.json`.
        -   Loads the JSON data from `tempAZ.json`.
        -   For each VM in the JSON data:
            -   Prints the VM name and image reference.
            -   Constructs an SSH command string to connect to the instance using "sam@" and the public IP.
            -   The remote command is the same as for AWS: lists Docker images and containers.
            -   Executes the SSH command using `subprocess.call`.

---

## Overall Workflow

1.  **Configuration**: Define VMs and Docker containers in `configurations.json`.
2.  **AWS**:
    -   Run `ec2_create_key.py` once to generate an SSH key pair and save it as `ec2-1-keypair.pem`.
    -   Run `ec2_create_instances.py` to:
        -   Create EC2 instances.
        -   Use `load-docker.sh` to SSH into each instance, install Docker, log in to Docker Hub, and run/pull specified containers.
3.  **Azure**:
    -   Run `az_create_instances.py` to:
        -   Call `az_makeVM.sh` to create Azure VMs.
        -   Use `az-docker.sh` to SSH into each VM, install Docker, log in to Docker Hub, and run/pull specified containers.
4.  **Monitoring**:
    -   Run `monitor.py` to check the status of Docker images and containers on all running AWS and Azure VMs.

This setup provides a comprehensive solution for managing cloud infrastructure and containerized applications across two major cloud providers.
