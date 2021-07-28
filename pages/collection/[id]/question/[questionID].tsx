import { getPropsUserSever } from '@/utils/session'
import React, { ReactElement } from 'react'

interface Props {
  user
}

export default function QuestionPage({ user }: Props): ReactElement {
  return <div>QuestionPage</div>
}

export const getServerSideProps = getPropsUserSever
