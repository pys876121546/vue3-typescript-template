// export mock data
export default [
  {
    url: '/api/v1/demo',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: 'hello world',
      };
    },
  },
];


