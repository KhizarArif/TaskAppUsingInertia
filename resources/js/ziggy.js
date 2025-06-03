const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"tasks.index":{"uri":"tasks","methods":["GET","HEAD"]},"tasks.store":{"uri":"tasks","methods":["POST"]},"tasks.show":{"uri":"tasks\/{task}","methods":["GET","HEAD"],"parameters":["task"]},"tasks.update":{"uri":"tasks\/{task}","methods":["PUT"],"parameters":["task"]},"tasks.destroy":{"uri":"tasks\/{task}","methods":["DELETE"],"parameters":["task"]},"storage.local":{"uri":"storage\/{path}","methods":["GET","HEAD"],"wheres":{"path":".*"},"parameters":["path"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
