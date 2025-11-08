pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    echo 'Installing backend dependencies...'
                    sh 'npm install'
                    echo 'Building backend...'
                    sh 'npm run build || echo "No build script, starting server instead"'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('backend/frontend') {
                    echo 'Installing frontend dependencies...'
                    sh 'npm install'
                    echo 'Building frontend...'
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add your test commands here
                sh 'echo "Tests would run here"'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // Add deployment commands here
                sh 'echo "Deployment would happen here"'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
            // You can add notifications here
        }
        failure {
            echo 'Pipeline failed!'
            // You can add failure notifications here
        }
    }
}
