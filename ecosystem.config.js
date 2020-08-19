module.exports = {
    apps: [
        {
            // pm2로 실행한 프로세스 목록에서 이 애플리케이션의 이름으로 지정될 문자열
            name: "client",
            // pm2로 실행 스트립트
            script: "cd client && yarn start",
            // 개발환경시 적용될 설정 지정
            env: {
                "PORT": 4000,
                "NODE_ENV": "development"
            },
            // 배포환경시 적용될 설정 지정
            env_production: {
                "PORT": 8080,
                "NODE_ENV": "production"
            }
        },{
            name      : "server",
            script    : "cd server && yarn start",
            // 개발환경시 적용될 설정 지정
            env: {
                "PORT": 4100,
                "NODE_ENV": "development"
            },
            // 배포환경시 적용될 설정 지정
            env_production: {
                "PORT": 8180,
                "NODE_ENV": "production"
            }
        }
    ]
};