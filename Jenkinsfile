pipeline {
    agent any

    environment {
        SSH_USER = 'ubuntu'
        SSH_HOST = '51.21.165.6'
        DEPLOY_DIR = '/var/www/capsulory'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/charith0901/Capsulory.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Next.js') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['60246f1e-a57b-4020-ac74-cf636c4db7da']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST << 'EOF'
                    mkdir -p $DEPLOY_DIR
                    cd $DEPLOY_DIR
                    if [ ! -d ".git" ]; then
                        git clone git@github.com:charith0901/capsulory.git .
                    else
                        git pull origin main
                    fi
                    npm install --production
                    pm2 restart capsulory || pm2 start npm --name capsulory -- start
                    EOF
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
