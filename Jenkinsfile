pipeline {

  agent any

  environment {
    NEXUS_PASSWORD = credentials('nexus-ode-password')
    IMAGE = "maven.opendigitaleducation.com/docker/repository/sre-docker-hosted/swarm-console:${params.VERSION}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build and Push Docker image') {
      steps {
        script {
          def url = ''
          if (params.ENV == 'prod') {
            url = 'https://ferme-numerique.lyceeconnecte.fr/backend'
          } else {
            url = 'https://ferme-numerique.ode.tools/backend'
          }

          def cmd = "docker buildx build \\\n"
          cmd += "  --platform linux/amd64,linux/arm64 \\\n"
          cmd += "  -t ${IMAGE} \\\n"
          cmd += "  --build-arg NEXT_PUBLIC_API_SERVER=${url} \\\n"
          cmd += "  --push \\\n"
          cmd += "  ."

          sh cmd
        }
      }
    }
  }
}
