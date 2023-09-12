import * as THREE from 'three';

class TextSprite extends THREE.Sprite {
  constructor(message, parameters = {}) {
    // 기본 매개변수 설정
    const {
      fontsize = 32, // 텍스트 글꼴 크기 (기본값: 32)
      borderColor = { r: 0, g: 0, b: 0, a: 1.0 }, // 테두리 색상 (기본값: 검정)
      backgroundColor = { r: 255, g: 255, b: 255, a: 1.0 }, // 배경 색상 (기본값: 흰색)
      textColor = { r: 0, g: 0, b: 0, a: 1.0 }, // 텍스트 색상 (기본값: 검정)
      canvasX = 0, // 캔버스의 X 좌표 위치 (기본값: 0)
      canvasY = 0, // 캔버스의 Y 좌표 위치 (기본값: 0)
      canvasZ = 0, // 캔버스의 Z 좌표 위치 (기본값: 0)
      width = 3, // 스프라이트 폭 (기본값: 3)
      height = 2, // 스프라이트 높이 (기본값: 2)
    } = parameters;

    // 캔버스 해상도 설정
    const canvasWidth = 150;
    const canvasHeight = 100;

    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const context = canvas.getContext('2d');

    const borderThickness = 8; // 테두리 두께
    const fontface = 'Arial'; // 사용할 글꼴

    const fontSizePx = `${fontsize}px`;
    context.font = `Bold ${fontSizePx} ${fontface}`;

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
    const lines = message.split('\n');
    const lineHeight = fontsize + borderThickness;
    lines.forEach((line, index) => {
      // 텍스트를 캔버스에 그림
      context.fillText(line, borderThickness, (index + 1) * lineHeight);
    });

    const texture = new THREE.CanvasTexture(canvas);

    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      color: 0xffffff, // 스프라이트의 색상 (흰색)
    });

    super(spriteMaterial);

    this.position.set(canvasX, canvasY, canvasZ);
    this.scale.set(width, height, 1.0);

    this.canvas = canvas; // 캔버스 엘리먼트를 클래스 프로퍼티로 저장
    this.parameters = parameters; // 파라미터를 클래스 프로퍼티로 저장
    this.message = message; // 메시지를 클래스 프로퍼티로 저장
  }

  // 메세지를 업데이트하는 메서드
  updateText(newMessage) {
    if (!newMessage) {
      return; // newMessage가 없으면 아무 작업도 하지 않고 함수 종료
    }

    this.message = newMessage; // 메시지 업데이트

    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const lines = newMessage.split('\n');
    const lineHeight =
      this.parameters.fontsize + this.parameters.borderThickness;
    context.font = `Bold ${this.parameters.fontsize}px Arial`;
    context.fillStyle = `rgba(${this.parameters.backgroundColor.r},${this.parameters.backgroundColor.g},${this.parameters.backgroundColor.b},${this.parameters.backgroundColor.a})`;
    context.strokeStyle = `rgba(${this.parameters.borderColor.r},${this.parameters.borderColor.g},${this.parameters.borderColor.b},${this.parameters.borderColor.a})`;

    lines.forEach((line, index) => {
      // 업데이트된 메시지를 다시 캔버스에 그림
      context.fillText(
        line,
        this.parameters.borderThickness,
        (index + 1) * lineHeight
      );
    });

    const texture = new THREE.CanvasTexture(this.canvas);
    this.material.map = texture;
    texture.needsUpdate = true;
  }

  // 테두리 색상을 업데이트하는 메서드
  updateBorderColor(newBorderColor) {
    this.parameters.borderColor = newBorderColor;
    this.updateText(this.message); // 텍스트 업데이트 호출
  }
}

export default TextSprite;
