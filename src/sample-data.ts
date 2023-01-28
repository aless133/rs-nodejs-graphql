import DB from './utils/DB/DB';
export const addSampleData = async (db: DB) => {
  const user1 = await db.users.create({
    firstName: 'John',
    lastName: 'Doe',
    email: 'jd@mail.com',
  });
  await db.profiles.create({
    avatar: 'doe.jpg',
    sex: 'male',
    birthday: 1,
    country: 'Nevermind',
    street: 'Unknown',
    city: 'Nevermore',
    memberTypeId: 'basic',
    userId: user1.id,
  });
  await db.posts.create({
    title: 'Post 1 title',
    content: 'Post 1 content',
    userId: user1.id,
  });
  await db.posts.create({
    title: 'Post 2 title',
    content: 'Post 2 content',
    userId: user1.id,
  });

  const user2 = await db.users.create({
    firstName: 'David',
    lastName: 'Beckham',
    email: 'db@mail.com',
  });
  await db.profiles.create({
    avatar: 'beks.jpg',
    sex: 'male',
    birthday: 2,
    country: 'USA',
    street: 'Soccer',
    city: 'LA',
    memberTypeId: 'business',
    userId: user2.id,
  });
  await db.posts.create({
    title: 'Soccer in USA',
    content: 'Socer is very god bla bla bla',
    userId: user2.id,
  });

  const user3 = await db.users.create({
    firstName: 'Alan',
    lastName: 'Smith',
    email: 'smith@mail.com',
  });
  await db.profiles.create({
    avatar: 'smith.jpg',
    sex: 'male',
    birthday: 3,
    country: 'GB',
    street: 'Baker',
    city: 'London',
    memberTypeId: 'basic',
    userId: user3.id,
  });

  await db.users.change(user1.id, {
    subscribedToUserIds: [user2.id, user3.id],
  });
  await db.users.change(user2.id, {
    subscribedToUserIds: [user3.id],
  });

};
