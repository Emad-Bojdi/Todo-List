import React from 'react'
import AddTodo from "../components/templates/AddTodo"
import { getSession } from 'next-auth/react';

function addtodo() {
  return (
    <AddTodo />
  )
}

export default addtodo;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session }
  };
}
