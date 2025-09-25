"use client";
import { useEffect, useState } from "react";

export default function PortOneDemoButton({
  merchantId = "imp00000000",
  pg = "kakaopay.TC0ONETIME",
  amount = 100,
  title = "그린스퀘어 나무후원(데모)",
  children = "포트원 결제창 띄우기 (데모)",
  redirectTo = "/orderPage",
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.IMP) {
      setReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
    script.async = true;
    script.onload = () => setReady(true);
    script.onerror = () => {
      console.error("포트원 스크립트를 로드하는 데 실패했습니다.");
      alert(
        "결제 모듈 로딩에 실패했습니다. 네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요."
      );
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openPayment = () => {
    if (!window.IMP || !ready) {
      alert("결제 모듈이 준비되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    const IMP = window.IMP;
    IMP.init(merchantId);

    const paymentParams = {
      pg,
      pay_method: "card",
      merchant_uid: "demo_" + Date.now(),
      name: title,
      amount,
      buyer_email: "demo@example.com",
      buyer_name: "홍길동",
      buyer_tel: "010-1234-5678",
      m_redirect_url: `${window.location.origin}${redirectTo}`,
    };

    console.log("결제 요청 직전 파라미터:", paymentParams);
    console.log("사용된 가맹점 식별코드:", merchantId);

    IMP.request_pay(paymentParams, (rsp) => {
      if (rsp.success) {
        alert(`결제창 진입 성공(데모)\nimp_uid: ${rsp.imp_uid}`);
      } else {
        console.log("결제 실패 또는 종료:", rsp);
        alert(
          `결제창이 종료되었거나 실패했습니다.\n사유: ${
            rsp.error_msg ?? "알 수 없는 오류"
          }`
        );
      }
    });
  };

  return (
    <button
      type="button"
      disabled={!ready}
      onClick={openPayment}
      style={{
        height: 48,
        width: "100%",
        maxWidth: 420,
        borderRadius: 12,
        color: "#fff",
        background: ready ? "#3B82F6" : "#9CA3AF",
        cursor: ready ? "pointer" : "not-allowed",
        border: "none",
        fontSize: "16px",
      }}
    >
      {ready ? children : "결제 모듈 로딩 중…"}
    </button>
  );
}
