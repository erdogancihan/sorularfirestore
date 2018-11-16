import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {

 
  return (
    <div className="container">
      <div className="flex-container" >
      <h2 className="center">Bilgi Yarışmasına Hoşgeldiniz.</h2>
      </div>
      <div className="home" >
      
      <p className="justify indent">
        Uygulamamız sayesinde hem eğlenecek, hem de öğreneceksiniz.
      </p>
      <p className="justify indent">
        Yarışma içerisinde 4 seçenekli sorular bulunmaktadır ve her sorunun tek
        cevabı vardır. Sorular bir soru havuzu içerisinden rastgele
        seçilir.Sorular kolaydan zora doğru sorulur. İlk 5 soru 1 puan, 5'den
        10'a kadar 2 puan, 10'dan 20'ye kadar 3 puan, 20'den 30'a kadar 4
        puan, 30'uncu sorudan itibaren de 5 puandır.
      </p>
      <p className="justify indent">
        Soruyu cevaplamak için 30 saniyeniz var. Her yarışmada 3 joker hakkınız
        var. 50% jokeri ile yanlış iki şık elenir. Soruyu geç jokeri ile bir
        sonraki soruya geçebilirsiniz. Süre yetmezse süreyi uzat jokeri ile
        süreyi 30 saniye uzatabilirsiniz.
      </p>
      <p className="justify indent">
        Bir saatlik süre içerinde 3 kere yarışma hakkınız vardır.Yarışmaya
        başlamak için siteye üye olmanız gerekmektedir.
      </p>
      <div className="flex-container">
        <Link to="/exam/all" className="button">
          Yarışmaya Başla
        </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
