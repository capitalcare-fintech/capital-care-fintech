import {
  axisBankLogo,
  hdfcBankLogo,
  hdfcErgoLogo,
  heroFinCorpLogo,
  iciciBankLogo,
  iciciLombardLogo,
  idfcBankLogo,
  induslndBankLogo,
  licLogo,
  ltLogo,
  piramalLogo,
  poonawallaLogo,
  relianceGeneralLogo,
  smfgLogo,
  starHealthLogo,
  tataCapitalLogo,
  universalSompoLogo,
  magmaIsuranceLogo,
  orientalInsuranceLogo,
  niva_bupaLogo
} from "@/assets/partners";

const axisBankPartner = {
  name: "Axis Bank",
  logo: axisBankLogo,
};

const hdfcBankPartner = {
  name: "HDFC Bank",
  logo: hdfcBankLogo,
};

const hdfcErgoPartner = {
  name: "HDFC ERGO General Insurance",
  logo: hdfcErgoLogo,
};

const heroFinCorpPartner = {
  name: "Hero FinCorp",
  logo: heroFinCorpLogo,
};

const iciciBankPartner = {
  name: "ICICI Bank",
  logo: iciciBankLogo,
};

const iciciLombardPartner = {
  name: "ICICI Lombard General Insurance",
  logo: iciciLombardLogo,
};

const idfcFirstBankPartner = {
  name: "IDFC FIRST Bank",
  logo: idfcBankLogo,
};

const indusIndBankPartner = {
  name: "IndusInd Bank",
  logo: induslndBankLogo,
};

const licPartner = {
  name: "Life Insurance Corporation of India",
  logo: licLogo,
};

const ltTechnologyServicesPartner = {
  name: "L&T Technology Services",
  logo: ltLogo,
};

const piramalFinancePartner = {
  name: "Piramal Finance",
  logo: piramalLogo,
};

const poonawallaFincorpPartner = {
  name: "Poonawalla Fincorp",
  logo: poonawallaLogo,
};

const relianceGeneralInsurancePartner = {
  name: "Reliance General Insurance",
  logo: relianceGeneralLogo,
};

const smfgIndiaCreditPartner = {
  name: "SMFG India Credit",
  logo: smfgLogo,
};

const starHealthPartner = {
  name: "Star Health Insurance",
  logo: starHealthLogo,
};

const tataCapitalPartner = {
  name: "Tata Capital",
  logo: tataCapitalLogo,
};

const universalSompoPartner = {
  name: "Universal Sompo General Insurance",
  logo: universalSompoLogo,
};

const magmaInsurance = {
  name: "Magma Insurance",
  logo: magmaIsuranceLogo,
};

const nivaBupa = {
  name: "Niva bupa",
  logo: niva_bupaLogo,
};

const orientalInsurance = {
  name: "Oriental Insurance",
  logo: orientalInsuranceLogo,
};

export const loanPartners = [
  axisBankPartner,
  hdfcBankPartner,
  heroFinCorpPartner,
  iciciBankPartner,
  idfcFirstBankPartner,
  indusIndBankPartner,
  ltTechnologyServicesPartner,
  piramalFinancePartner,
  poonawallaFincorpPartner,
  smfgIndiaCreditPartner,
  tataCapitalPartner,
];

export const insurancePartners = [
  hdfcErgoPartner,
  iciciLombardPartner,
  licPartner,
  relianceGeneralInsurancePartner,
  starHealthPartner,
  universalSompoPartner,
  magmaInsurance,
  orientalInsurance,
  nivaBupa,
];

export const partners = [...loanPartners, ...insurancePartners];
const hp=[...loanPartners.slice(0,4),...insurancePartners.slice(0,4)];
// export const homePartners = partners.slice(0, 8);
export const homePartners = hp;
