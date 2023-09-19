import {
  Group,
  AxesHelper,
  BoxGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Mesh,
  MathUtils,
} from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export default class Edukit {
  constructor() {
    this.loader = new FBXLoader();
    this.object = {};
    this.loaded = false;
    this.axes = {};
    this.trays = {};
  }

  async fileload(scene) {
    const group = (this.object.group = new Group());
    const groupM3Y = (this.axes.yAxis = new Group());
    const groupM3X = (this.axes.xAxis = new Group());
    const groupM3X2 = (this.axes.xAxis2 = new Group());

    // 트레이
    const groupTrayM1 = (this.trays.m1 = new Group());
    const groupTrayM2 = (this.trays.m2 = new Group());
    const groupTrayM3_1 = (this.trays.m3_1 = new Group());
    const groupTrayM3_2 = (this.trays.m3_2 = new Group());
    const groupTrayM3_3 = (this.trays.m3_3 = new Group());
    const groupTrayM3_4 = (this.trays.m3_4 = new Group());
    const groupTrayM3_5 = (this.trays.m3_5 = new Group());

    // 3호기 중심축 위치 재조정
    groupM3X.position.x = -6; // bar+gripper
    groupM3X.position.y = 7; // bar+gripper
    groupM3X.position.z = -8.9; // bar+gripper
    groupM3X2.position.x = -5.1; // gripper

    const groupM3 = (this.object.group = new Group());

    // const geometry = new BoxGeometry(3, 3, 3);
    // const material = new MeshBasicMaterial({ color: 'red' });
    // const mesh = new Mesh(geometry, material);
    // mesh.position.y = 3;
    group.position.x = 10;

    // 여기부터
    const mesh_belt = (this.object.mesh_belt = await this.loader.loadAsync(
      'files/Belt.FBX'
    ));
    const mesh_edukit_body = (this.object.mesh_edukit_body =
      await this.loader.loadAsync('files/BodyEdukit.FBX'));
    const mesh_c_sensor_body = (this.object.mesh_c_sensor_body =
      await this.loader.loadAsync('files/ColorSensor_Body.FBX'));
    const mesh_c_sensor_grn = (this.object.mesh_c_sensor_grn =
      await this.loader.loadAsync('files/ColorSensor_G.FBX'));
    const mesh_c_sensor_red = (this.object.mesh_c_sensor_red =
      await this.loader.loadAsync('files/ColorSensor_R.FBX'));
    const mesh_m1_body = (this.object.mesh_m1_body =
      await this.loader.loadAsync('files/M1_Body_2.FBX'));
    const mesh_m1_pusher = (this.object.mesh_m1_pusher =
      await this.loader.loadAsync('files/M1_Pusher.FBX'));
    const mesh_m2_body = (this.object.mesh_m2_body =
      await this.loader.loadAsync('files/M2_Body_2.FBX'));
    const mesh_m2_pusher = (this.object.mesh_m2_pusher =
      await this.loader.loadAsync('files/M2_Pusher.FBX'));
    const mesh_m3_body = (this.object.mesh_m3_body =
      await this.loader.loadAsync('files/M3_Body.FBX'));
    const mesh_m3_gripper = (this.object.mesh_m3_gripper =
      await this.loader.loadAsync('files/M3_Gripper_2.FBX'));
    const mesh_m3_y_axis = (this.object.mesh_m3_y_axis =
      await this.loader.loadAsync('files/M3_Yaxis.FBX'));
    const mesh_m3_y_bar = (this.object.mesh_m3_y_bar =
      await this.loader.loadAsync('files/M3_Ybar.FBX'));
    const mesh_trf_body = (this.object.mesh_trf_body =
      await this.loader.loadAsync('files/TrafficLight_Body.FBX'));
    const mesh_trf_grn = (this.object.mesh_trf_grn =
      await this.loader.loadAsync('files/TrafficLight_Green.FBX'));
    const mesh_trf_red = (this.object.mesh_trf_red =
      await this.loader.loadAsync('files/TrafficLight_Red.FBX'));
    const mesh_trf_yll = (this.object.mesh_trf_yll =
      await this.loader.loadAsync('files/TrafficLight_Yellow.FBX'));
    const mesh_v_sensor = (this.object.mesh_v_sensor =
      await this.loader.loadAsync('files/VisionSensor2.FBX'));
    const mesh_edukit_body_test = (this.object.mesh_edukit_body_test =
      await this.loader.loadAsync('files/BodyEdukit_2.FBX'));
    const mesh_tray_m1 = (this.object.mesh_tray_m1 =
      await this.loader.loadAsync('files/Tray_2.FBX'));
    const mesh_tray_m2 = (this.object.mesh_tray_m2 =
      await this.loader.loadAsync('files/Tray_2.FBX'));
    const mesh_tray_m3 = (this.object.mesh_tray_m3 =
      await this.loader.loadAsync('files/Tray_2.FBX'));

    // Tray 위치 조정
    mesh_tray_m1.position.set(19.8, 0.3, 4);
    mesh_tray_m2.position.set(11.4, 0.3, 4);
    mesh_tray_m3.position.set(2.3, 0, 0);

    // 3호기 중심축 위치 재조정
    mesh_m3_y_bar.position.x = 6; // bar+gripper
    mesh_m3_y_bar.position.y = -7; // bar+gripper
    mesh_m3_y_bar.position.z = 8.9; // bar+gripper
    mesh_m3_gripper.position.x = 11.1; // gripper
    mesh_m3_gripper.position.y = -7; // gripper
    mesh_m3_gripper.position.z = 8.9; // gripper

    for (const [_, object] of Object.entries(this.object)) {
      object.scale.set(0.5, 0.5, 0.5);
      object.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    // const geometry = new BoxGeometry(3, 3, 3);
    // const material = new MeshBasicMaterial({ color: 'red' });
    // const mesh = new Mesh(geometry, material);

    // groupM3X2.add(mesh_m3_gripper, new AxesHelper(7));
    // groupM3X.add(mesh_m3_y_bar, groupM3X2, new AxesHelper(7));
    groupM3X2.add(mesh_m3_gripper);
    groupM3X.add(mesh_m3_y_bar, groupM3X2);
    groupM3Y.add(groupM3X, mesh_m3_y_axis);
    group.add(groupM3Y);
    groupTrayM1.add(mesh_tray_m1);
    groupTrayM2.add(mesh_tray_m2);
    groupTrayM3_1.add(mesh_tray_m3.clone());
    groupTrayM3_2.add(mesh_tray_m3.clone());
    groupTrayM3_3.add(mesh_tray_m3.clone());
    groupTrayM3_4.add(mesh_tray_m3.clone());
    groupTrayM3_5.add(mesh_tray_m3.clone());
    group.add(
      mesh_belt,
      // mesh_edukit_body,
      mesh_edukit_body_test,
      mesh_c_sensor_body,
      mesh_c_sensor_grn,
      mesh_c_sensor_red,
      mesh_m1_body,
      mesh_m1_pusher,
      mesh_m2_body,
      mesh_m2_pusher,
      mesh_m3_body,
      mesh_trf_body,
      mesh_trf_grn,
      mesh_trf_red,
      mesh_trf_yll,
      mesh_v_sensor,
      // mesh_tray_m1,
      // mesh_tray_m2,
      // mesh_tray_m3,
      groupTrayM1,
      // groupTrayM2,
      // groupTrayM3
      groupTrayM3_1,
      groupTrayM3_2,
      groupTrayM3_3,
      groupTrayM3_4,
      groupTrayM3_5
    );
    group.position.x = -1;
    group.position.y = -5;
    scene.add(group);

    this.loaded = true;
  }

  actionY(value) {
    const currentY = this.axes.yAxis.position.y;
    if (typeof value !== 'undefined') {
      const fixedValue = parseFloat(value.toFixed(2));
      const fixedCurrentY = parseFloat(currentY.toFixed(2));
      const deltaY = Math.abs(fixedValue - fixedCurrentY) * 0.08; // 비례 상수를 조절하여 세밀함을 결정

      if (fixedValue < fixedCurrentY) {
        this.axes.yAxis.position.y -= deltaY;
      } else if (fixedValue > fixedCurrentY) {
        this.axes.yAxis.position.y += deltaY;
      }
    }
  }

  actionX(value) {
    const currentX = this.axes.xAxis2.rotation.y;
    if (typeof value !== 'undefined') {
      const fixedValue = parseFloat(value.toFixed(2));
      const fixedCurrentX = parseFloat(currentX.toFixed(2));
      const deltaXDeg = Math.abs(fixedValue - fixedCurrentX) * 0.05; // degree 단위로 차이 계산
      //const deltaXRad = MathUtils.degToRad(deltaXDeg * 0.01); // 비례 상수를 조절하여 세밀함을 결정

      if (fixedValue < fixedCurrentX) {
        this.axes.xAxis.rotation.y += deltaXDeg;
        this.axes.xAxis2.rotation.y -= deltaXDeg;
      } else if (fixedValue > fixedCurrentX) {
        this.axes.xAxis.rotation.y -= deltaXDeg;
        this.axes.xAxis2.rotation.y += deltaXDeg;
      }
    }
  }

  trayActionM1(value) {
    // console.log('trayActionM1 호출, value=', value);
    this.trays.m1.visible = value;
  }

  trayActionM2(value, color) {
    // console.log('trayActionM2 호출, value=', value, ', material=', material);
    this.trays.m2.visible = value;

    // 재질 가져오기
    const currentMaterial = this.trays.m2.children[0].children[0].material[0];
    if (color === 'red') {
      currentMaterial.color.set(0xff0000);
    }
    if (color === 'white') {
      currentMaterial.color.set(0xffffff);
    }
  }

  trayActionM3_1(value, color) {
    // console.log('trayActionM3 호출, value=', value);
    this.trays.m3_1.visible = value;

    // 재질 가져오기
    const currentMaterial = this.trays.m3_1.children[0].children[0].material[0];
    if (color === 'red') {
      currentMaterial.color.set(0xff0000);
    }
    if (color === 'white') {
      currentMaterial.color.set(0xffffff);
    }
  }

  trayActionM3_2(value, color) {
    // console.log('trayActionM3 호출, value=', value);
    this.trays.m3_2.position.y = 1.2;
    this.trays.m3_2.visible = value;

    // 재질 가져오기
    const currentMaterial = this.trays.m3_2.children[0].children[0].material[0];
    if (color === 'red') {
      currentMaterial.color.set(0xff0000);
    }
    if (color === 'white') {
      currentMaterial.color.set(0xffffff);
    }
  }

  trayActionM3_3(value, color) {
    // console.log('trayActionM3 호출, value=', value);
    this.trays.m3_3.position.y = 2.4;
    this.trays.m3_3.visible = value;

    // 재질 가져오기
    const currentMaterial = this.trays.m3_3.children[0].children[0].material[0];
    if (color === 'red') {
      currentMaterial.color.set(0xff0000);
    }
    if (color === 'white') {
      currentMaterial.color.set(0xffffff);
    }
  }

  trayActionM3_4(value, color) {
    // console.log('trayActionM3 호출, value=', value);
    this.trays.m3_4.position.y = 3.6;
    this.trays.m3_4.visible = value;

    // 재질 가져오기
    const currentMaterial = this.trays.m3_4.children[0].children[0].material[0];
    if (color === 'red') {
      currentMaterial.color.set(0xff0000);
    }
    if (color === 'white') {
      currentMaterial.color.set(0xffffff);
    }
  }

  trayActionM3_5(value, color) {
    // console.log('trayActionM3_5 호출, value=', value);
    this.trays.m3_5.position.y = 4.8;
    this.trays.m3_5.visible = value;

    // 재질 가져오기
    const currentMaterial = this.trays.m3_5.children[0].children[0].material[0];
    if (color === 'red') {
      currentMaterial.color.set(0xff0000);
    }
    if (color === 'white') {
      currentMaterial.color.set(0xffffff);
    }
  }
}
