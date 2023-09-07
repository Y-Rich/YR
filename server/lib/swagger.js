const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Team Project - Edukit API',
      version: '1.0.0',
      description: 'API documentation for the Edukit',
    },

    servers: [
      {
        url: 'http://192.168.0.127:8000', // Update with your server URL
        description: '외부접근용 local Server',
      },
      {
        url: 'http://localhost:8000', // Update with your server URL
        description: 'backend 테스트용 local Server',
      },
    ],
    components: {
      schemas: {
        // Department schema definition
        Department: {
          type: 'object',
          required: ['name', 'code', 'description'], // id와 name, description 필드를 필수 필드로 지정
          properties: {
            id: {
              type: 'number',
              example: '1',
              description: 'DB 저장 고유 ID',
            },
            name: {
              type: 'string',
              example: 'Edukit_1호',
              description: '에듀킷 이름',
            },
            code: {
              type: 'string',
              example: 'edukit01',
              description:
                '에듀킷 구분용 코드 / user departmentCode 필드와 join',
            },
            description: {
              type: 'string',
              example: '텍스트를 입력합니다.',
              description: '부가 설명란',
            },
            updatedPwDate: {
              type: 'string',
              example: '2023-09-04T06:35:04.000Z',
              description: '부서 정보 업데이트 일자',
            },
            createdAt: {
              type: 'string',
              example: '2023-09-04T06:35:04.000Z',
              description: '부서 생성 일자',
            },
          },
        },
        // User schema definition
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: '1',
              description: 'DB 저장 고유 ID',
            },
            departmentCode: {
              type: 'string',
              example: 'edukit01',
              description:
                '에듀킷 구분용 코드 / department모델 -code 필드와 join',
            },
            name: {
              type: 'string',
              example: '영앤리치',
              description: '사용자 이름',
            },
            userid: {
              type: 'string',
              example: 'test1234',
              description: '사용자 로그인 아이디 / Unique값',
            },
            role: {
              type: 'string',
              example: 'worker',
              description:
                '사용자 권한 / manager [총책임자],supervisor[중간책임자] , worker[일반 직원]',
            },
            email: {
              type: 'string',
              example: 'test@test.com',
              description: '사용자 이메일주소',
            },
            phone: {
              type: 'string',
              example: '010-1111-1111',
              description: '사용자 전화번호',
            },
            updatedPwDate: {
              type: 'string',
              example: '2023-09-04T06:35:04.000Z',
              description: '패스워드 업데이트 일자 [default : null]',
            },
            createdAt: {
              type: 'string',
              example: '2023-09-04T06:35:04.000Z',
              description: '가입 일자',
            },
            deletedAt: {
              type: 'string',
              example: '2023-09-04T06:35:04.000Z',
              description: '회원탈퇴 일자 [default : null]',
            },
            // password: { type: 'string', example: 'password123' },
            Department: {
              type: 'string',
              example: 'null',
              description: '시퀄라이즈 join 관련  - 무시할것',
            },
          },
        },

        // Edukit Control schema definition
        // Control: {
        //   type: 'object',
        //   properties: {
        //     classId: { type: 'string', example: 'class_id_here' },
        //     userId: { type: 'string', example: 'user_id_here' },
        //     enrollmentDate: { type: 'string', example: '2023-07-15T12:00:00Z' },
        //   },
        // },
      },
    },
  },
  // apis: ['./routes/*.js', './routes/enrollmentRoutes.js'], //  Add the path to your route files here
  apis: ['./routes/user.js'], //  Add the path to your route files here
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };
