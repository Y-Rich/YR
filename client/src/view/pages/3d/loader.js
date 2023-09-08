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
  }

  async fileload(scene) {
    const group = (this.object.group = new Group());
    const groupM3Y = (this.axes.yAxis = new Group());
    const groupM3X = (this.axes.xAxis = new Group());
    const groupM3X2 = (this.axes.xAxis2 = new Group());

    const groupM3 = (this.object.group = new Group());

    // const geometry = new BoxGeometry(3, 3, 3);
    // const material = new MeshBasicMaterial({ color: 'red' });
    // const mesh = new Mesh(geometry, material);
    // mesh.position.y = 3;
    group.position.x = 10;

    // // 이전 body 설정
    // const body = await this.loader.loadAsync('files/Body.FBX');
    // body.position.x = -15;
    // body.scale.set(0.0005, 0.0005, 0.0005);

    // const bodymaterial = new MeshStandardMaterial({ color: 'white' }); // white 색상

    // body.traverse(function (child) {
    //   if (child.isMesh) {
    //     child.castShadow = true;
    //     child.receiveShadow = true;
    //     // child.material = bodymaterial; // 색 변경
    //   }
    // });

    // const mesh1_1 = (this.object.mesh1_1 = await this.loader.loadAsync(
    //   'files/StaticMesh1.FBX'
    // ));
    // const mesh1_2 = (this.object.mesh1_2 = await this.loader.loadAsync(
    //   'files/StaticMesh2.FBX'
    // ));
    // const mesh1_3 = (this.object.mesh1_3 = await this.loader.loadAsync(
    //   'files/StaticMesh3.FBX'
    // ));
    // const mesh1_4 = (this.object.mesh1_4 = await this.loader.loadAsync(
    //   'files/StaticMesh4.FBX'
    // ));
    // const mesh2_1 = (this.object.mesh2_1 = await this.loader.loadAsync(
    //   'files/Robot_1_Body.FBX'
    // ));
    // const mesh2_2 = (this.object.mesh2_2 = await this.loader.loadAsync(
    //   'files/Robot_1_Pusher.FBX'
    // ));
    // const mesh3_1 = (this.object.mesh3_1 = await this.loader.loadAsync(
    //   'files/Robot_2_Body.FBX'
    // ));
    // const mesh3_2 = (this.object.mesh3_2 = await this.loader.loadAsync(
    //   'files/Robot_2_Pusher.FBX'
    // ));

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
      await this.loader.loadAsync('files/M1_Body.FBX'));
    const mesh_m1_pusher = (this.object.mesh_m1_pusher =
      await this.loader.loadAsync('files/M1_Pusher.FBX'));
    const mesh_m2_body = (this.object.mesh_m2_body =
      await this.loader.loadAsync('files/M2_Body.FBX'));
    const mesh_m2_pusher = (this.object.mesh_m2_pusher =
      await this.loader.loadAsync('files/M2_Pusher.FBX'));
    const mesh_m3_body = (this.object.mesh_m3_body =
      await this.loader.loadAsync('files/M3_Body.FBX'));
    const mesh_m3_gripper = (this.object.mesh_m3_gripper =
      await this.loader.loadAsync('files/M3_Gripper.FBX'));
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

    // mesh1_1.position.y = -1.5;
    // // mesh1_1.position.x = 5;
    // mesh1_1.rotation.x = -90 * (Math.PI / 180);
    // mesh1_1.rotation.z = -160 * (Math.PI / 180);

    // mesh1_2.position.y = -1.3;
    // mesh1_2.position.x = 1.8;
    // mesh1_2.rotation.x = -90 * (Math.PI / 180);
    // mesh1_2.rotation.z = -10 * (Math.PI / 180);

    // mesh1_3.position.z = -1.4;
    // mesh1_3.rotation.x = -90 * (Math.PI / 180);
    // mesh1_3.rotation.z = -170 * (Math.PI / 180);

    // mesh1_4.position.z = -2.8;
    // mesh1_4.rotation.x = -90 * (Math.PI / 180);
    // mesh1_4.rotation.z = -170 * (Math.PI / 180);

    // mesh2_1.position.z = -0.8;
    // mesh2_1.rotation.x = -90 * (Math.PI / 180);
    // mesh2_1.rotation.z = -180 * (Math.PI / 180);

    // mesh2_2.position.z = -0.8;
    // mesh2_2.position.x = -0.35;
    // mesh2_2.rotation.x = -90 * (Math.PI / 180);
    // mesh2_2.rotation.z = -180 * (Math.PI / 180);

    // mesh3_1.position.z = 0.8;
    // mesh3_1.rotation.x = -90 * (Math.PI / 180);
    // mesh3_1.rotation.z = -180 * (Math.PI / 180);

    // mesh3_2.position.z = 2.8;
    // mesh3_2.rotation.x = -90 * (Math.PI / 180);
    // mesh3_2.rotation.z = -180 * (Math.PI / 180);

    for (const [_, object] of Object.entries(this.object)) {
      object.scale.set(0.5, 0.5, 0.5);
      object.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    groupM3X2.add(mesh_m3_gripper, new AxesHelper(7));
    groupM3X.add(mesh_m3_y_bar, groupM3X2, new AxesHelper(7));
    groupM3Y.add(groupM3X, mesh_m3_y_axis);
    group.add(groupM3Y);
    group.add(
      mesh_belt,
      mesh_edukit_body,
      mesh_c_sensor_body,
      mesh_c_sensor_grn,
      mesh_c_sensor_red,
      mesh_m1_body,
      mesh_m1_pusher,
      mesh_m2_body,
      mesh_m2_pusher,
      mesh_m3_body,
      // mesh_m3_gripper,
      // mesh_m3_y_axis,
      // mesh_m3_y_bar,
      mesh_trf_body,
      mesh_trf_grn,
      mesh_trf_red,
      mesh_trf_yll,
      mesh_v_sensor
    );
    group.position.x = -1;
    group.position.y = -5;
    scene.add(group);
    // scene.add(body);

    // // group2.add(mesh2_1, mesh.clone(), new AxesHelper(7));
    // // scene.add(group2);
    // // group2.position.x = -14.6;
    // scene.add(mesh2_1);
    // mesh2_1.position.x = -14.6;
    // scene.add(mesh2_2);
    // mesh2_2.position.x += -14.6;

    // scene.add(mesh3_1);
    // mesh3_1.position.x = -5.2;
    // scene.add(mesh3_2);
    // mesh3_2.position.x = -5.2;

    this.loaded = true;
  }

  actionY(value) {
    const currentY = this.axes.yAxis.position.y;
    if (value.toFixed(2) < currentY.toFixed(2)) {
      this.axes.yAxis.position.y -= 0.05;
    } else if (value.toFixed(2) > currentY.toFixed(2)) {
      this.axes.yAxis.position.y += 0.05;
    }
  }

  actionX(value) {
    const currentX = this.axes.xAxis2.rotation.y;
    // this.axes.xAxis.rotation.y = -value
    // this.axes.xAxis2.rotation.y = value
    if (value.toFixed(2) < currentX.toFixed(2)) {
      this.axes.xAxis.rotation.y += MathUtils.degToRad(1);
      this.axes.xAxis2.rotation.y += MathUtils.degToRad(-1);
    } else if (value.toFixed(2) > currentX.toFixed(2)) {
      this.axes.xAxis.rotation.y += MathUtils.degToRad(-1);
      this.axes.xAxis2.rotation.y += MathUtils.degToRad(1);
    }
  }
}
