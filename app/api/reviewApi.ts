import { Review, ReviewData } from "@/lib/types"
import { REVIEW_URL } from "@/lib/urls"

export const postReview = async (data: ReviewData, token: string): Promise<Review> => {
  const resp = await fetch(REVIEW_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  const respData: Review = await resp.json()
  return respData
}

export const putReview = async (reviewId: string, reviewData: ReviewData, token: string): Promise<Review> => {
  const url = `${REVIEW_URL}${reviewId}`
  const resp = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(reviewData)
  })
  const data: Review = await resp.json()
  return data
}