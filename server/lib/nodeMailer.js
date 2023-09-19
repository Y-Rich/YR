const nodemailer = require('nodemailer');
const env = require('dotenv');
const path = require('path');
const fs = require('fs');
env.config();

const { EMAIL_HOST, EMAIL_PW } = process.env;

// 파일을 읽어서 HTML 템플릿에 추가하는 함수
function readFileAndInsertIntoTemplate(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8'); // 파일 읽기
    return fileContent;
  } catch (error) {
    console.error('파일을 읽는 중 오류가 발생했습니다.', error);
    return null;
  }
}
const filePath = path.join(__dirname, '..', 'templates', 'index.html');
// 파일을 읽고 HTML에 삽입
const finalHTML = readFileAndInsertIntoTemplate(filePath);

// 메일발송 객체
const mailSender = {
  // 메일발송 함수
  sendGmail: function (param, email) {
    let transporter = nodemailer.createTransport({
      service: 'gmail', //gmail service 사용
      port: 465, //465 port를 통해 요청 전송
      secure: true, //보안모드 사용
      auth: {
        user: EMAIL_HOST, // 보내는 메일의 주소
        pass: EMAIL_PW, // 보내는 메일의 비밀번호
      },
    });
    // 메일 옵션
    let mailOptions = {
      from: EMAIL_HOST, // 보내는 메일의 주소
      to: param.toEmail, // 수신할 이메일
      subject: '[UVC] PASSWORD RESET URL ', // 메일 제목
      html:
        `<div>
      <h1>안녕하세요. ${email}님.</h1>
      <h2>비밀번호 재설정 링크를 보내드립니다.</h2>
      </div>
      ` + finalHTML, //메일 내용
      attachments: param.file ? [{ path: param.file }] : null, //첨부파일
    };

    return transporter.sendMail(mailOptions);
  },
};

module.exports = mailSender;
