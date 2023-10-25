pipeline {
    agent any


    stages {
        stage('Prepare') {
            steps {
                sh 'echo "Clonning Repository"'
                git branch: 'master',
                    url: 'https://lab.ssafy.com/s09-final/S09P31B104.git',
                    credentialsId: '10215'
            }
            post {
                success {
                     sh 'echo "Successfully Cloned Repository"'
                 }
                 failure {
                     sh 'echo "Fail Cloned Repository"'
                 }
            }
        }

        stage('Docker stop'){
            steps {
                dir('BE'){
                    sh 'echo "Docker Container Stop"'
                    sh 'docker-compose -f /var/jenkins_home/workspace/aucation-cicd/docker-compose.yml down'
                }
            }
            post {
                 failure {
                     sh 'echo "Docker Fail"'
                }
            }
        }

        stage('RM Docker'){
            steps {

                sh 'echo "Remove Docker"'

                //정지된 도커 컨테이너 찾아서 컨테이너 ID로 삭제함
                sh '''
                    result=$( docker container ls -a --filter "name=auc*" -q )
                    if [ -n "$result" ]
                    then
                        docker rm $(docker container ls -a --filter "name=auc*" -q)
                    else
                        echo "No such containers"
                    fi
                '''
                sh '''
                                    result=$( docker container ls -a --filter "name=auc*" -q )
                                    if [ -n "$result" ]
                                    then
                                        docker rm $(docker container ls -a --filter "name=auc*" -q)
                                    else
                                        echo "No such containers"
                                    fi
                                '''

                // auc로 시작하는 이미지 찾아서 삭제함
                sh '''
                    result=$( docker images -f "reference=auc*" -q )
                    if [ -n "$result" ]
                    then
                        docker rmi -f $(docker images -f "reference=auc*" -q)
                    else
                        echo "No such container images"
                    fi
                '''
                sh '''
                                    result=$( docker images -f "reference=auc*" -q )
                                    if [ -n "$result" ]
                                    then
                                        docker rmi -f $(docker images -f "reference=auc*" -q)
                                    else
                                        echo "No such container images"
                                    fi
                                '''
                // 안쓰는이미지 -> <none> 태그 이미지 찾아서 삭제함
                sh '''
                    result=$(docker images -f "dangling=true" -q)
                    if [ -n "$result" ]
                    then
                        docker rmi -f $(docker images -f "dangling=true" -q)
                    else
                        echo "No such container images"
                    fi
                '''

            }
            post {
                 failure {
                     sh 'echo "Remove Fail"'
                }
            }
        }
        stage('Set Permissions') {
                    steps {
                        // 스크립트 파일에 실행 권한 추가
                        sh 'chmod +x /var/jenkins_home/workspace/aucation-cicd/start-prod.sh'
                    }
                }
        stage('Execute start-prod.sh Script') {
            steps {
                // start-prod.sh 스크립트 실행
                sh '/var/jenkins_home/workspace/aucation-cicd/start-prod.sh'
            }
        }
    }
}
