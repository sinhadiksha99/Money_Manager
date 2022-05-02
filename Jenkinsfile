pipeline {
  environment {
    imagename = "anuj2014/node-docker-expense"
    registryCredential = 'anuj-dockerhub'
    dockerImage = ''
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git([url: 'https://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@github.com/Anuj-2014/Expense_Manager.git', branch: 'master', credentialsId: 'anuj-github'])

      }
    }
    // stage('Testing') {
    //       steps{
    //          sh "mvn test"
    //       }
    //     }
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build imagename
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
             dockerImage.push('latest')
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
         sh "docker rmi $imagename:latest"
      }
    }

    stage("Invoke ansible playbook") {
      steps{
      ansiblePlaybook(
      	credentialsId: "container-key",
        inventory: "inventory",
        installation: "ansible",
        limit: "",
        playbook: "playbook.yml",
        extras: ""
      )
    }
    }

  }
}
