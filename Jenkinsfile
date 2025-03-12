pipeline {
    agent any

    environment {
        SSH_USER = "ubuntu"
        SSH_HOST = "51.21.195.6"
        APP_DIR = "/home/ubuntu/capsulory"
    }

    stages {
        stage('Clone Repository') {
            steps {
                sh 'ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} "git clone -b main https://github.com/charith0901/Capsulory.git ${APP_DIR} || (cd ${APP_DIR} && git pull)"'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'ssh ${SSH_USER}@${SSH_HOST} "cd ${APP_DIR} && npm install"'
            }
        }

        stage('Build Project') {
            steps {
                sh 'ssh ${SSH_USER}@${SSH_HOST} "cd ${APP_DIR} && npm run build"'
            }
        }

        stage('Restart Server') {
            steps {
                sh 'ssh ${SSH_USER}@${SSH_HOST} "pm2 restart all || pm2 start npm --name capsulory -- start"'
            }
        }
    }
}
