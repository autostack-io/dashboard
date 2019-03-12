import React from "react";

require("paymentfont/css/paymentfont.min.css");

const CreditCard = () => <center><i className="pf pf-credit-card"></i></center>;
const Mastercard = () => <center><i className="pf pf-mastercard"></i></center>;
const Visa = () => <center><i className="pf pf-visa"></i></center>;
const Amex = () => <center><i className="pf pf-american-express"></i></center>;
const Elo = () => <center><i className="pf pf-elo"></i></center>;

export {
	CreditCard,
	Mastercard,
	Visa,
	Amex,
	Elo,
};