
// 이메일이 맞으면 true, 틀리면 false
export const isStandardEmail = (email)=> (/^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z.]*\.[a-zA-Z]{2,3}$/i.test(email));

export const isStandardPassword = (password) => (/^(?=.*[0-9])(?=.*[a-zA-Z]).{8,20}$/.test(password)) && !password.match(/[^0-9a-zA-Z`~!@#$%^&*()-=_+]/);

export const isNoneErrorCharInPassword = (password) => !password.match(/[^0-9a-zA-Z`~!@#$%^&*()-=_+]/);

export const isStandardNickname = (nickname) => (/^[a-zA-Z가-힇0-9]{2,8}$/.test(nickname))