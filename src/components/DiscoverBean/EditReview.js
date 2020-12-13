import { useEffect, useState } from "react";
import { useQuery } from "urql";
import { GET_SINGLE_REVIEW } from "queries";
import { useParams } from "react-router-dom";
import EditReviewForm from "./EditReviewForm";

const EditReview = props => {
  const { id } = useParams();
  const [reviewResult, reexecuteReviewQuery] = useQuery({
    query: GET_SINGLE_REVIEW,
    variables: { id }
  });
  const {
    data: dataReviewResult,
    fetching: fetchingReviewResult,
    error: errorReviewResult
  } = reviewResult;

  if (fetchingReviewResult) return <p>Loading...</p>;
  if (errorReviewResult) return <p>Oh no... ErrorReviewResult: {errorReviewResult.message}</p>;
  if (dataReviewResult?.bean_reviews_by_pk)
    return <EditReviewForm beanReview={dataReviewResult.bean_reviews_by_pk} id={id} />;
  return null;

};

export default EditReview;
