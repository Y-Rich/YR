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
        // Factory schema definition
        Factory: {
          type: 'object',
          properties: {
            factoryID: {
              type: 'number',
              example: '1',
              description: '공장의 고유 ID',
              required: true,
            },
            factoryName: {
              type: 'string',
              example: '공장1',
              description: '공장의 이름',
              required: true,
            },
            description: {
              type: 'string',
              example: '이 공장은 제품 생산을 담당합니다.',
              description: '공장에 대한 설명',
              required: false, // 설명은 필수가 아님
            },
          },
        },
        // Employee schema definition
        Employee: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: '1',
              description: '직원의 고유 ID',
              required: true,
            },
            email: {
              type: 'string',
              example: 'test@example.com',
              description: '직원의 이메일 주소 / 중복 불가능',
              required: true,
            },
            password: {
              type: 'string',
              example: 'hashedPassword',
              description: '직원의 비밀번호',
              required: true,
            },
            name: {
              type: 'string',
              example: '홍길동',
              description: '직원의 이름',
              required: true,
            },
            positionID: {
              type: 'number',
              example: '6',
              description: '직원의 직책 ID / 기본값은 worker로 설정',
              required: false, // 기본값이 설정되므로 필수는 아님
            },
            phone: {
              type: 'string',
              example: '010-1234-5678',
              description: '직원의 전화번호',
              required: true,
            },
            createdAt: {
              type: 'string',
              example: '2023-09-19T12:00:00.000Z',
              description: '직원의 가입 일자',
              required: true,
            },
            updatedAt: {
              type: 'string',
              example: '2023-09-19T14:30:00.000Z',
              description: '직원 정보가 마지막으로 업데이트된 일자',
              required: false, // 업데이트 시간은 필수가 아님
            },
            deletedAt: {
              type: 'string',
              example: 'null',
              description:
                '직원의 회원 탈퇴 일자 (null은 탈퇴하지 않음을 나타냄)',
              required: false, // 탈퇴 일자가 없을 수도 있음
            },
          },
        },
        // ProductionLine schema definition
        ProductionLine: {
          type: 'object',
          properties: {
            lineID: {
              type: 'number',
              example: '1',
              description: '생산 라인의 고유 ID',
              required: true,
            },
            lineName: {
              type: 'string',
              example: '라인1',
              description: '생산 라인의 이름',
              required: true,
            },
            factoryID: {
              type: 'number',
              example: '1',
              description: '라인이 속한 공장의 ID',
              required: false, // 공장 ID는 선택적으로 제공될 수 있음
            },
            description: {
              type: 'string',
              example: '이 라인은 제품 A를 생산합니다.',
              description: '생산 라인에 대한 설명',
              required: false, // 설명은 필수가 아님
            },
          },
        },
        // Position schema definition
        Position: {
          type: 'object',
          properties: {
            positionID: {
              type: 'number',
              example: '1',
              description: '직책의 고유 ID',
              required: true,
            },
            positionName: {
              type: 'string',
              example: 'manager',
              description: '직책의 이름',
              required: true,
            },
            description: {
              type: 'string',
              example:
                'manager 등급입니다. 모든 공장에 대한 모든 권한이 주어집니다.',
              description: '직책에 대한 설명',
              required: false, // 설명은 필수가 아님
            },
          },
        },
        // Permission schema definition
        Permission: {
          type: 'object',
          properties: {
            permissionID: {
              type: 'number',
              example: '1',
              description: '권한의 고유 ID',
              required: true,
            },
            positionID: {
              type: 'number',
              example: '3',
              description: '직원의 직급 ID',
              required: false, // 직급 ID는 선택적으로 제공될 수 있음
            },
            lineID: {
              type: 'number',
              example: '6',
              description: '공장의 특정 공정 라인 ID',
              required: false, // 공정 라인 ID는 선택적으로 제공될 수 있음
            },
            view: {
              type: 'boolean',
              example: 'false',
              description: '모니터링 권한',
              required: false, // 모니터링 권한은 선택적으로 제공될 수 있음
              default: false,
            },
            control: {
              type: 'boolean',
              example: 'false',
              description: '공정 제어 권한',
              required: false, // 공정 제어 권한은 선택적으로 제공될 수 있음
              default: false,
            },
          },
        },
        // Token schema definition
        Token: {
          type: 'object',
          properties: {
            employeeID: {
              type: 'number',
              example: '1',
              description: '직원의 고유 ID',
              required: true,
            },
            refreshToken: {
              type: 'string',
              example: 'refreshTokenValue',
              description: '토큰 갱신을 위한 리프레시 토큰',
              required: true,
              unique: true,
            },
          },
        },
        // Product schema definition
        Mongo_Product: {
          type: 'object',
          properties: {
            productName: {
              type: 'string',
              example: 'product - 1695038127109',
              description: '제품의 이름',
              required: true,
            },
            manufacturer: {
              type: 'string',
              example: 'edukit1',
              description: '제조사',
              required: true,
            },
            category: {
              type: 'string',
              example: 'line1',
              description: '제품 카테고리',
              required: true,
            },
            createdAt: {
              type: 'string',
              example: '2023-09-19T12:00:00.000Z',
              description: '제품 생성 일자',
              required: true,
              immutable: true,
            },
          },
        },
        // Sensor schema definition
        Mongo_Sensor: {
          type: 'object',
          properties: {
            humidity: {
              type: 'number',
              example: 50,
              description: '습도 정보',
            },
            temperature: {
              type: 'number',
              example: 25,
              description: '온도 정보',
            },
            particulates: {
              type: 'number',
              example: 0.5,
              description: '미세먼지 정보',
            },
            createdAt: {
              type: 'string',
              example: '2023-09-19T12:00:00.000Z',
              description: '데이터 생성 일자',
              required: true,
              immutable: true,
            },
          },
        },
        // Log schema definition
        Mongo_Log: {
          type: 'object',
          properties: {
            employeeID: {
              type: 'number',
              example: 1,
              description: 'employ-직원의 고유 ID',
            },
            name: {
              type: 'string',
              example: '홍길동',
              description: 'employ-직원의 이름',
            },
            email: {
              type: 'string',
              example: 'employee@example.com',
              description: 'employ-직원의 이메일 주소',
            },
            positionID: {
              type: 'number',
              example: 1,
              description: 'employ-직원의 직급 ID',
            },
            control: {
              type: 'string',
              example: '"{"tagId":"1","value":"0"}"',
              description: 'employ- 제어 기능 상세 내역',
            },
            view: {
              type: 'string',
              example: '조회 내역',
              description: 'employ- 조회 기능 상세 내역',
            },
            productName: {
              type: 'string',
              example: 'product - 1694881370712',
              description: 'factory-제품의 이름',
            },
            manufacturer: {
              type: 'string',
              example: 'edukit1',
              description: 'factory-제조사',
            },
            category: {
              type: 'string',
              example: 'employ',
              description: '공통사항 - 이력의 카테고리 (employ, factory)',
            },
            type: {
              type: 'string',
              example: 'login',
              description: '공통사항 - 이력의 유형',
            },
            createdAt: {
              type: 'string',
              example: '2023-09-19T12:00:00.000Z',
              description: '공통사항 - 이력 생성 일시',
            },
            position: {
              type: 'string',
              example: 'manager',
              description: 'employ- 직급 (가상 필드)',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], //  Add the path to your route files here
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };
