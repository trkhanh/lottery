import DB from "./db.ts";

export const getlotterys = async ({ response }: { response: any }) => {
  response.status = 200;
  response.body = await lotterys.find({});
};

export const getlottery = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  const lottery: any = await getBy(params.id);
  if (lottery) {
    response.status = 200;
    response.body = lottery;
  } else {
    response.status = 404;
  }
};

export const addlottery = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();
  const lottery = body.value;
  const newlottery = await lotterys.insertOne(
    { author: lottery.author, title: lottery.title },
  );
  response.body = newlottery;
  response.status = 201;
};

export const updatelottery = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  let lottery = await getBy(params.id);
  if (lottery) {
    const body = await request.body();
    const update: { author?: string; title?: string } = body.value;
    lottery = { ...lottery, ...update };
    await lotterys.updateOne({
      _id: {
        "$oid": params.id,
      },
    }, lottery);
    response.status = 200;
  } else {
    response.status = 404;
  }
};

export const deletelottery = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  const lottery = await getBy(params.id);
  if (lottery) {
    await lotterys.deleteOne({
      _id: {
        "$oid": params.id,
      },
    });
    response.status = 200;
  } else {
    response.status = 404;
  }
};

const getBy = async (id: string): (Promise<any>) =>
  await lotterys.findOne({
    _id: {
      "$oid": id,
    },
  });

const lotterys = DB.collection("lotterys");

await lotterys.deleteMany({});

let initiallotterys: any[] = [{
  author: "George R. R. Martin",
  title: "A Game of Thrones",
}, {
  author: "George R. R. Martin",
  title: "A Clash of Kings",
}, {
  author: "George R. R. Martin",
  title: "A Storm of Swords",
}, {
  author: "George R. R. Martin",
  title: "A Feast for Crows",
}, {
  author: "George R. R. Martin",
  title: "A Dance with Dragons",
}];

await lotterys.insertMany(initiallotterys);
