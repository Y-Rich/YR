import * as THREE from 'three';

class TextSprite extends THREE.Sprite {
  constructor(message, parameters = {}) {
    const {
      fontface = 'Arial',
      fontsize = 18,
      borderThickness = 4,
      borderColor = { r: 0, g: 0, b: 0, a: 1.0 },
      backgroundColor = { r: 255, g: 255, b: 255, a: 1.0 },
    } = parameters;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = `Bold ${fontsize}px ${fontface}`;

    const metrics = context.measureText(message);
    const textWidth = metrics.width;

    canvas.width = textWidth + borderThickness * 2;
    canvas.height = fontsize * 1.4 + borderThickness * 2;

    context.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`;
    context.strokeStyle = `rgba(${borderColor.r},${borderColor.g},${borderColor.b},${borderColor.a})`;
    context.lineWidth = borderThickness;

    context.beginPath();
    context.moveTo(borderThickness / 2, borderThickness / 2);
    context.lineTo(textWidth + borderThickness, borderThickness / 2);
    context.quadraticCurveTo(
      textWidth + borderThickness,
      fontsize * 1.4 + borderThickness,
      textWidth / 2 + borderThickness / 2,
      fontsize * 1.4 + borderThickness
    );
    context.lineTo(
      textWidth / 2 + borderThickness / 2,
      fontsize * 1.4 + borderThickness
    );
    context.quadraticCurveTo(
      borderThickness / 2,
      fontsize * 1.4 + borderThickness,
      borderThickness / 2,
      borderThickness / 2
    );
    context.closePath();

    context.fill();
    context.stroke();

    context.fillStyle = 'rgba(0, 0, 0, 1.0)';
    context.fillText(message, borderThickness, fontsize + borderThickness);

    const texture = new THREE.CanvasTexture(canvas);

    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      color: 0xffffff,
    });

    super(spriteMaterial);

    // You can set the sprite's scale if needed
    // this.scale.set(width, height, 1.0);
  }
}

export default TextSprite;
