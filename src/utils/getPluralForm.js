function getPluralForm(n, forms) {
  if (n % 10 === 1 && n % 100 !== 11) {
    return forms[0];
  } else if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) {
    return forms[1];
  } else {
    return forms[2];
  }
}

export default getPluralForm;
