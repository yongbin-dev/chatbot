// 쿠키 가져오기
export function getCookie(cookieName : string) {
  cookieName = `${cookieName}=`;
  let cookieData = document.cookie;

  let cookieValue = "";
  let start = cookieData.indexOf(cookieName);

  if (start !== -1) {
    start += cookieName.length;
    let end = cookieData.indexOf(";", start);
    if (end === -1) end = cookieData.length;
    cookieValue = cookieData.substring(start, end);
  }
  
  return unescape(cookieValue);
}
