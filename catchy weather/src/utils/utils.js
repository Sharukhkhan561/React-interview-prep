export const isCityRecommended = (data) => {
    const temp = data?.main?.temp;
    const condition = data?.weather[0]?.description;

    if (condition?.includes('clear') && temp >= 15 && temp <= 30) {
      return true;
    }
    return false;
  };