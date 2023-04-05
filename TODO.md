# CI Pipeline

- build Docker Image for Server
- build Docker Image for Frontend
   [example](https://gitlab.vier.ai/ux/portal-realm/utility/gitlab-ci-template/-/blob/main/.gitlab-ci.template.yml)
   [example](https://gitlab.vier.ai/iam/utilities/gitlab-ci-templates)
   [example](https://gitlab.vier.ai/TobiasGraf/ci-templates)

- (*optional) push images to container registry [harbor](http://harbor-p01.vier.services/)

- generate Swarmfile (compose with images instead of build context stuff) with Env Variable
  [example](https://gitlab.vier.ai/ux/portal-realm/host-app/-/blob/main/cicd/generate_swarm_config.sh)
    
- (book swarm once)
- deploy to swarm