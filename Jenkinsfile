pipeline {
    agent any

    environment {
        // --- DOCKER HUB CONFIGURATION ---
        // Change this to your actual Docker Hub username
        DOCKERHUB_USERNAME = 'your_dockerhub_username'
        
        // This MUST match the ID of the credentials you create in Jenkins (Global scope, Username/Password)
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub-credentials'
        
        // --- DEPLOYMENT VM CONFIGURATION ---
        VM_IP = 'your_vm_ip_address_here'
        VM_USER = 'your_vm_user_here'
        // Jenkins Credentials mapped to your SSH Private Key
        VM_SSH_CREDENTIALS_ID = 'vm-ssh-credentials'
        PROJECT_DIR = '/path/to/your/project/on/vm'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Polls latest changes from GitHub
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Backend & Frontend Images using Compose..."
                    // Export the username so standard docker-compose parses the image name perfectly
                    sh "DOCKERHUB_USERNAME=${DOCKERHUB_USERNAME} docker-compose build"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "Logging into Docker Hub securely..."
                    withCredentials([usernamePassword(credentialsId: env.DOCKERHUB_CREDENTIALS_ID, passwordVariable: 'DOCKERHUB_PASS', usernameVariable: 'DOCKERHUB_USER')]) {
                        sh "echo \$DOCKERHUB_PASS | docker login -u \$DOCKERHUB_USER --password-stdin"
                        
                        echo "Pushing freshly built images to Docker Hub..."
                        sh "DOCKERHUB_USERNAME=${DOCKERHUB_USERNAME} docker-compose push"
                    }
                }
            }
        }

        stage('Deploy to VM') {
            steps {
                script {
                    echo "Connecting to destination VM to pull exact latest image and restart..."
                    
                    // --- REMOTE SSH DEPLOYMENT ---
                    // Requires "SSH Agent" Jenkins plugin to be installed.
                    sshagent(credentials: [env.VM_SSH_CREDENTIALS_ID]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${VM_USER}@${VM_IP} << 'EOF'
                            # Navigate to the project directory on your VM
                            cd ${PROJECT_DIR}
                            
                            export DOCKERHUB_USERNAME=${DOCKERHUB_USERNAME}
                            
                            # Pull the latest images we just pushed to Docker Hub
                            docker-compose pull
                            
                            # Restart containers in detached mode; only touches containers whose images updated
                            docker-compose up -d --remove-orphans
EOF
                        """
                    }
                    
                    // -------------------------------------------------------------
                    // (ALTERNATIVE): If your Jenkins instance is ALREADY running directly on the VM, 
                    // comment out the 'sshagent' block above and uncomment this below instead:
                    // -------------------------------------------------------------
                    // sh """
                    //     export DOCKERHUB_USERNAME=${DOCKERHUB_USERNAME}
                    //     docker-compose pull
                    //     docker-compose up -d --remove-orphans
                    // """
                }
            }
        }
    }

    post {
        success {
            echo "CI/CD Pipeline success! Latest changes are now live on the VM."
        }
        failure {
            echo "Pipeline failed. Check Jenkins logs for details."
        }
        always {
            // Logout for security
            sh "docker logout || true"
            // Cleanup the workspace to avoid old cache taking up Jenkins disk
            cleanWs()
        }
    }
}
