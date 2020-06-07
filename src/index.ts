type Fn = (data?: any) => void;

interface Event {
  key: number;
  callback: Fn;
}

interface PublishedEvents {
  name: string;
  data?: any;
}

class EventManager {
  _events: { [key: string]: Event[] } = {};

  _publishedEvents: PublishedEvents[] = [];

  subscribe(name: string, callback: Fn): number {
    if (!this._events[name]) {
      this._events[name] = [];
    }
    const event = { key: Date.now(), callback };
    this._events[name].push(event);
    return event.key;
  }

  publish(name: string, data?: any): void {
    this._publishedEvents.push({ name, data });
    if (this._events[name]) {
      this._events[name].forEach(({ callback }): void => {
        callback(data);
      });
    }
  }

  unSubscribe(name: string, key: number): void {
    if (this._events[name]) {
      for (let i = 0; i < this._events[name].length; i++) {
        if (key === this._events[name][i].key) {
          this._events[name].splice(i, 1);
          break;
        }
      }
    }
  }

  // Make sure published events can be triggered when subscribed
  ensureTriggeredAndSubscribe(name: string, callback: Fn): number {
    const event = this._publishedEvents
      .slice()
      .reverse()
      .find((item) => item.name === name);
    if (event) {
      callback(event.data);
    }
    return this.subscribe(name, callback);
  }
}

const eventManager = new EventManager();

export default eventManager;
