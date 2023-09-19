import * as THREE from 'three';

class TextSprite extends THREE.Sprite {
  constructor(parameters = {}) {
    // 기본 매개변수 설정
    const {
      fontsize = 32, // 텍스트 글꼴 크기 (기본값: 32)
      borderColor = { r: 255, g: 255, b: 255, a: 1.0 }, // 테두리 색상 (기본값: 흰색)
      backgroundColor = { r: 0, g: 0, b: 0, a: 1.0 }, // 배경 색상 (기본값: 검정)
      textColor = { r: 255, g: 255, b: 255, a: 1.0 }, // 텍스트 색상 (기본값: 흰색)
      canvasX = 0, // 캔버스의 X 좌표 위치 (기본값: 0)
      canvasY = 0, // 캔버스의 Y 좌표 위치 (기본값: 0)
      canvasZ = 0, // 캔버스의 Z 좌표 위치 (기본값: 0)
      width = 3, // 스프라이트 폭 (기본값: 3)
      height = 1.2, // 스프라이트 높이 (기본값: 2)
      message = 'Loading...',
    } = parameters;

    // 캔버스 해상도 설정
    const canvasWidth = 150;
    const canvasHeight = 60;

    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const context = canvas.getContext('2d');

    const borderThickness = 8; // 테두리 두께

    // 글꼴과 크기 설정
    const fontface = 'Hack'; // 사용할 글꼴
    const fontSizePx = `${fontsize}px`;
    context.font = `${fontSizePx} ${fontface}`;

    context.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`;
    context.strokeStyle = `rgba(${borderColor.r},${borderColor.g},${borderColor.b},${borderColor.a})`;
    context.lineWidth = borderThickness;

    // 테두리를 그리기 위한 모서리 둥근 정도
    const borderRadius = 20;

    // 테두리 그리기 시작
    context.beginPath();
    context.moveTo(borderRadius, 0);
    context.lineTo(canvasWidth - borderRadius, 0);
    context.quadraticCurveTo(canvasWidth, 0, canvasWidth, borderRadius);
    context.lineTo(canvasWidth, canvasHeight - borderRadius);
    context.quadraticCurveTo(
      canvasWidth,
      canvasHeight,
      canvasWidth - borderRadius,
      canvasHeight
    );
    context.lineTo(borderRadius, canvasHeight);
    context.quadraticCurveTo(0, canvasHeight, 0, canvasHeight - borderRadius);
    context.lineTo(0, borderRadius);
    context.quadraticCurveTo(0, 0, borderRadius, 0);
    context.closePath();

    // 테두리 색상 채우기 및 그리기
    context.fill();
    context.stroke();

    context.fillStyle = `rgba(${textColor.r},${textColor.g},${textColor.b},${textColor.a})`;

    // 메시지를 줄바꿈 문자("\n")로 분리하여 처리
    // const lines = message.split('\n');
    const lineHeight = fontsize + borderThickness;
    // 텍스트를 캔버스에 그림
    // lines.forEach((line, index) => {
    //   context.fillText(line, borderThickness, (index + 1) * lineHeight);
    // });
    context.fillText(message, borderThickness, lineHeight);

    const texture = new THREE.CanvasTexture(canvas);

    // 스프라이트(Sprite) 객체를 생성하기 위한 재료(Material)인 SpriteMaterial을 생성
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      color: 0xffffff, // 스프라이트의 색상 (흰색)
    });

    super(spriteMaterial);

    // 파라미터로 받은 캔버스 위치와 크기 설정
    this.position.set(canvasX, canvasY, canvasZ);
    this.scale.set(width, height, 1.0);

    // 클래스 내 다른 메서드에서 접근할 수 있도록 설정 옵션 저장
    this.canvas = canvas;
    this.parameters = parameters;
    // this.message = message;
  }

  // // 메세지와 테두리 색상을 업데이트하는 메서드
  // updateTextAndBorderColor(newMessage, newBorderColor) {
  //   this.message = newMessage; // 메시지 업데이트
  //   this.parameters.borderColor = newBorderColor; // 테두리 색상 업데이트

  //   // 이전 내용을 지우는 코드
  //   const context = this.canvas.getContext('2d');
  //   context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  //   // 메세지 설정
  //   const lines = newMessage.split('\n');
  //   const lineHeight =
  //     this.parameters.fontsize + this.parameters.borderThickness;
  //   // 폰트와 폰트크기 설정
  //   context.font = `Bold ${this.parameters.fontsize}px Vernada`;
  //   // 색 설정
  //   const bgColor = this.parameters.backgroundColor || {
  //     r: 0,
  //     g: 0,
  //     b: 0,
  //     a: 1.0,
  //   }; // backgroundColor 값을 잡아내지 못해서 추가한 코드
  //   context.fillStyle = `rgba(${bgColor.r},${bgColor.g},${bgColor.b},${bgColor.a})`;
  //   context.strokeStyle = `rgba(${this.parameters.borderColor.r},${this.parameters.borderColor.g},${this.parameters.borderColor.b},${this.parameters.borderColor.a})`;

  //   lines.forEach((line, index) => {
  //     // 업데이트된 메시지를 다시 캔버스에 그림
  //     context.fillText(
  //       line,
  //       this.parameters.borderThickness,
  //       (index + 1) * lineHeight
  //     );
  //   });

  //   const texture = new THREE.CanvasTexture(this.canvas);
  //   this.material.map = texture;
  //   texture.needsUpdate = true;
  // }

  // 스프라이트 업데이트 메소드
  updateParameters(newParameters) {
    // 기존 파라미터와 새 파라미터 병합
    this.parameters = { ...this.parameters, ...newParameters };

    // 기존 캔버스 초기화 및 그리기
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 텍스트 그리기 설정
    const {
      fontsize = 32,
      borderColor = { r: 255, g: 255, b: 255, a: 1.0 },
      backgroundColor = { r: 0, g: 0, b: 0, a: 1.0 },
      textColor = { r: 255, g: 255, b: 255, a: 1.0 },
    } = this.parameters;

    // 폰트와 폰트 크기 설정
    const fontface = 'Hack'; // 사용할 글꼴
    const fontSizePx = `${fontsize}px`;
    context.font = `${fontSizePx} ${fontface}`;

    // 텍스트와 배경 설정
    context.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`;
    context.strokeStyle = `rgba(${borderColor.r},${borderColor.g},${borderColor.b},${borderColor.a})`;

    // 테두리 두께 설정
    const borderThickness = 8;

    // 테두리를 그리기 위한 모서리 둥근 정도
    const borderRadius = 20;

    // 테두리 그리기 시작
    context.beginPath();
    context.moveTo(borderRadius, 0);
    context.lineTo(this.canvas.width - borderRadius, 0);
    context.quadraticCurveTo(
      this.canvas.width,
      0,
      this.canvas.width,
      borderRadius
    );
    context.lineTo(this.canvas.width, this.canvas.height - borderRadius);
    context.quadraticCurveTo(
      this.canvas.width,
      this.canvas.height,
      this.canvas.width - borderRadius,
      this.canvas.height
    );
    context.lineTo(borderRadius, this.canvas.height);
    context.quadraticCurveTo(
      0,
      this.canvas.height,
      0,
      this.canvas.height - borderRadius
    );
    context.lineTo(0, borderRadius);
    context.quadraticCurveTo(0, 0, borderRadius, 0);
    context.closePath();

    // 테두리 색상 채우기 및 그리기
    context.fill();
    context.stroke();

    // 텍스트 설정
    context.fillStyle = `rgba(${textColor.r},${textColor.g},${textColor.b},${textColor.a})`;

    // 메시지를 줄바꿈 문자("\n")로 분리하여 처리
    // const lines = this.message.split('\n');
    const lineHeight = fontsize + borderThickness;

    // 텍스트를 캔버스에 그림
    // lines.forEach((line, index) => {
    //   context.fillText(line, borderThickness, (index + 1) * lineHeight);
    // });
    context.fillText(this.parameters.message, borderThickness, lineHeight);

    // 스프라이트를 업데이트
    const texture = new THREE.CanvasTexture(this.canvas);
    this.material.map = texture;
    texture.needsUpdate = true;
  }
}

export default TextSprite;
