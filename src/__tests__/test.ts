import eventManager from '../index';

test('subscribed event has been triggered', () => {
  const callback = jest.fn();
  eventManager.subscribe('test1', callback);
  eventManager.publish('test1', 'data');
  expect(callback).toHaveBeenCalledWith('data');
});

test('event published before subscription can be triggered', () => {
  eventManager.publish('test2', 'data');
  eventManager.publish('test2', 'data1');
  const callback = jest.fn();
  eventManager.ensureTriggeredAndSubscribe('test2', callback);
  expect(callback).toHaveBeenCalledWith('data1');
});

test('unsubscribe event', () => {
  const key = eventManager.subscribe('test3', () => {});
  eventManager.unSubscribe('test3', key);
  expect(eventManager._events['test3'].map((item) => item.key)).not.toContain(
    key
  );
});

test('event keys do not repeat', () => {
  const keys = [];
  for (let i = 0; i < 100; i++) {
    keys.push(eventManager.subscribe('test4', () => {}));
  }
  const set = new Set(keys);
  expect(set.size).toBe(keys.length);
});
