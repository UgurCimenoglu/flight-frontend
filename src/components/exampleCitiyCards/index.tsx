/* eslint-disable @next/next/no-img-element */
import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";

const ExampleCitiyCards = () => {
  const gridStyle: React.CSSProperties = {
    width: "25%",
    textAlign: "center",
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "4rem",
        }}
      >
        <h1>Ucuz Uçak Bileti Fly-U da!</h1>
      </div>
      <Row style={{ marginTop: "2rem" }}>
        <Col span={8}>
          <Card
            hoverable
            style={{ width: 400, minHeight: "30rem" }}
            cover={
              <img
                alt="example"
                src="https://a.cdn-hotels.com/gdcs/production6/d781/3bae040b-2afb-4b11-9542-859eeb8ebaf1.jpg"
              />
            }
          >
            <Meta
              title="İstanbul"
              description="İstanbul, Türkiye'de Marmara Bölgesi'nde yer alan ve İstanbul ilinin merkezi olan şehirdir. Ekonomik, tarihî ve sosyo-kültürel açıdan önde gelen şehirlerden biridir. Şehir, iktisadi büyüklük açısından dünyada 34. sırada yer alır."
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            style={{ width: 400, minHeight: "30rem" }}
            cover={
              <img
                alt="example"
                src="https://www.durayrentacar.com/uploads/images/NTM5KiEqHuDkZXXcCCkS1636748092.png"
              />
            }
          >
            <Meta
              title="İzmir"
              description="İzmir, Türkiye'de Ege Bölgesi'nde yer alan ve İzmir ilinin merkezi olan şehirdir. Ülkenin nüfus bakımından en kalabalık üçüncü şehridir. Ekonomik, tarihî ve sosyo-kültürel açıdan önde gelen şehirlerden biridir. İzmir, uzun ve dar bir körfezin başında yer almaktadır."
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            style={{ width: 400, minHeight: "30rem" }}
            cover={
              <img
                alt="example"
                src="https://image-tc.galaxy.tf/wijpeg-9hyi4vii0ajnli33gmr9ewcbc/antalya-1920.jpg"
              />
            }
          >
            <Meta
              title="Antalya"
              description="Antalya ili, Türkiye’nin güneyinde, merkezi Akdeniz kıyısında olan bir turizm merkezidir. Kuzeyinde; Burdur, Isparta, Konya, doğusunda; Karaman, Mersin, batısında; Muğla illeri vardır. Güneyi, Akdeniz ile çevrelenmiştir. Türk Riviera’sı Antalya kıyılarının uzunluğu 630 km’yi bulur."
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ExampleCitiyCards;
