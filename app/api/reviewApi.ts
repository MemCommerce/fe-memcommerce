import { Review, ReviewData, UserReview } from "@/lib/types"
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
  if (!resp.ok) {
    const errorData = await resp.json()
    console.error(errorData)
    throw Error(errorData)
  }
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
  if (!resp.ok) {
    const errorData = await resp.json()
    console.error(errorData)
    throw Error(errorData)
  }
  const data: Review = await resp.json()
  return data
}

export const getUserReviews = async (token: string): Promise<UserReview[]> => {
  const resp = await fetch(`${REVIEW_URL}user-reviews`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!resp.ok) {
    const errorData = await resp.text()
    console.error("Error fetching user reviews:", errorData)
    throw new Error("Failed to fetch user reviews")
  }
  const data: UserReview[] = await resp.json()
  return data
}