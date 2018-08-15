// Type definitions for gas-trello 0.1
// Project: https://github.com/kojole/gas-trello
// Definitions by: Yuichi Tanikawa <https://github.com/kojole>

declare namespace Trello {
  function setKey(key: string): void;
  function setToken(token: string): void;

  function rest(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    params: { [key: string]: string } = {}
  ): any;

  function get(path: string, params?: { [key: string]: string }): any;
  function post(path: string, params?: { [key: string]: string }): any;
  function put(path: string, params?: { [key: string]: string }): any;
  function del(path: string, params?: { [key: string]: string }): any;
}
