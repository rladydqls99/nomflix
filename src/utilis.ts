export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function StarRating(rating: number) {
  const maxStars = 5;
  const maxScore = 10;

  const percentage = (rating / maxScore) * 100;

  const filledStars = Math.round((percentage / 100) * maxStars);

  const starRatingString = "⭐️".repeat(filledStars);

  return starRatingString;
}
