const handleUsernameBlur = async () => {
  const { exists, message } = await checkUserExists({ username });
  if (exists) {
    setError(message);
  }
};
