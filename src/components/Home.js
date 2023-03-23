import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="mt-3">
          <h1>Fullstack Developer từ con số 0</h1>
          <p className="mt-3">
            <strong>1.</strong> <strong>Thư viện React.JS</strong> : công cụ
            siêu mạnh mẽ, giúp xây dựng giao diện website tương tự Facebook,
            Instagram...
          </p>
          <p>
            <strong>2. Framework Express &amp; Platform Node.JS</strong> : Với
            Node.JS, việc viết server bằng ngôn ngữ Javascript là điều hoàn toàn
            có thể. Bằng việc sử dụng framework Express trên nền tảng Node.JS,
            chúng ta sẽ cùng nhau viết server Node.JS theo chuẩn RESTful APIs,
            phục vụ cho giao diện frontend React.
          </p>
          <p>
            <strong>3.</strong>{" "}
            <strong>Hiểu cách Tư Duy &amp; Tự Design được database SQL</strong>{" "}
            : cơ sở dữ liệu quan hệ MySQL, đã quá phổ biến, cũng như quen thuộc
            với chúng ta. Tuy nhiên, việc thiết kế cơ sở dữ liệu như thế nào,
            làm sao để sử dụng nó một cách hiệu quả (thông qua ORM - object
            relational mapping) thì chúng ta sẽ cùng nhau tìm hiểu trong khóa
            học nhé.
          </p>
          <p>
            <strong>4.</strong>{" "}
            <strong>Thiết Kế giao diện website Responsive</strong>: một
            fullstack developer không chỉ biết "code cho chạy được", chúng ta sẽ
            làm đúng nghĩa của một người biết cả "frontend lẫn backend". Vì vậy,
            việc design một giao diện website trông "tốt" và tự động "co giãn"
            trên nhiều thiết bị là điều cực kỳ cần thiết. Với công cụ Bootstrap
            5 (mới nhất hiện tại), việc kiểm soát, sở hữu một giao diện
            resposive với React chưa từng dễ đến vậy.
          </p>
          <p>
            Khi kết thúc này, các bạn có thể tự tin vào bản thân mình, chúng ta
            có thể làm được một Fullstack Developer một cách đúng nghĩa. Và điều
            quan trọng, các bạn sẽ học được cách đứng trên đôi chân của chính
            bản thân mình, học "cách tự bơi" trên hành trình trở thành một
            Developer thực thụ.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
