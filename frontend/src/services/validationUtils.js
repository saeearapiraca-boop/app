const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+\-_])[A-Za-z\d@$!%*?&#+\-_]{8,}$/;
// const VALID_SEXO = ["masculino", "feminino", "outro", "prefiro-nao-dizer"];

export function validateRegisterForm(formData) {
  const errors = {};

  if (!formData.nome_completo?.trim()) {
    errors.nome_completo = "Nome obrigatório";
  } else if (formData.nome_completo.length < 3) {
    errors.nome_completo = "Mínimo 3 caracteres";
  }

  if (!formData.email?.trim()) {
    errors.email = "E-mail obrigatório";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "E-mail inválido";
  }

  if (!formData.data_nascimento) {
    errors.data_nascimento = "Data obrigatória";
  } else {
    const date = new Date(formData.data_nascimento);
    const today = new Date();
    if (date > today) {
      errors.data_nascimento = "Data não pode ser no futuro";
    }
  }

  if (!formData.sexo) {
    errors.sexo = "Sexo obrigatório";
  }

  if (!formData.senha) {
    errors.senha = "Senha obrigatória";
  } else if (!PASSWORD_REGEX.test(formData.senha)) {
    errors.senha = "8+ caracteres, maiúscula, minúscula, número e caractere especial";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}
