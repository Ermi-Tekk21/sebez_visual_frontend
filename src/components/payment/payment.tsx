import React from "react";

interface AcceptPaymentProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  totalPrice: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  userId: string;
  txRef: string;
}

const AcceptPayment: React.FC<AcceptPaymentProps> = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  totalPrice,
  address,
  city,
  state,
  zipCode,
  txRef,
}) => {
  const baseUrl = window.location.origin; // Get the base URL of the current location
  const returnUrl = `${baseUrl}/user/checkout/transaction-result`; // Construct the return URL

  return (
    <>
      <input type="hidden" name="public_key" value="CHAPUBK_TEST-ownPiYcgHzrXrdD2immKKQfuF3MgCZna" />
      <input type="hidden" name="tx_ref" value={txRef} />
      <input type="hidden" name="amount" value={totalPrice.toString()} />
      <input type="hidden" name="currency" value="ETB" />
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="first_name" value={firstName} />
      <input type="hidden" name="last_name" value={lastName} />
      <input type="hidden" name="phone_number" value={phoneNumber} />
      <input type="hidden" name="address" value={address} />
      <input type="hidden" name="city" value={city} />
      <input type="hidden" name="state" value={state} />
      <input type="hidden" name="zip_code" value={zipCode} />
      <input type="hidden" name="title" value="Let us do this" />
      <input type="hidden" name="description" value="Paying with Confidence with cha" />
      <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
      <input type="hidden" name="callback_url" value="https://example.com/callbackurl" />
      <input type="hidden" name="return_url" value={returnUrl} />
      <input type="hidden" name="meta[title]" value="test" />
    </>
  );
};

export default AcceptPayment;
