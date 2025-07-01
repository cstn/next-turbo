export const revalidate = 0;

const started = new Date();

enum Status {
  Ok = 'OK',
  Unavailable = 'UNAVAILABLE',
}

const GET = async () => Response.json({
  status: Status.Ok,
  uptime: Math.round(process.uptime()),
  started: started.toISOString(),
}, {
  status: 200,
});

export { GET };
