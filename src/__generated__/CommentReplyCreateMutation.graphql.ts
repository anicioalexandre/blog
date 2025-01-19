/**
 * @generated SignedSource<<bd1a310682f5ec10ed1fa622ddd03697>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AddDiscussionCommentInput = {
  body: string;
  clientMutationId?: string | null | undefined;
  discussionId: string;
  replyToId?: string | null | undefined;
};
export type CommentReplyCreateMutation$variables = {
  connections: ReadonlyArray<string>;
  input: AddDiscussionCommentInput;
};
export type CommentReplyCreateMutation$data = {
  readonly addDiscussionComment: {
    readonly comment: {
      readonly " $fragmentSpreads": FragmentRefs<"CommentItemFragment">;
    } | null | undefined;
  } | null | undefined;
};
export type CommentReplyCreateMutation = {
  response: CommentReplyCreateMutation$data;
  variables: CommentReplyCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CommentReplyCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AddDiscussionCommentPayload",
        "kind": "LinkedField",
        "name": "addDiscussionComment",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "DiscussionComment",
            "kind": "LinkedField",
            "name": "comment",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CommentItemFragment"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CommentReplyCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AddDiscussionCommentPayload",
        "kind": "LinkedField",
        "name": "addDiscussionComment",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "DiscussionComment",
            "kind": "LinkedField",
            "name": "comment",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "body",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "author",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "login",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "avatarUrl",
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v3/*: any*/)
                    ],
                    "type": "Node",
                    "abstractKey": "__isNode"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "createdAt",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "comment",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "DiscussionCommentEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0cdebc78adcddfa46e158554c710a42b",
    "id": null,
    "metadata": {},
    "name": "CommentReplyCreateMutation",
    "operationKind": "mutation",
    "text": "mutation CommentReplyCreateMutation(\n  $input: AddDiscussionCommentInput!\n) {\n  addDiscussionComment(input: $input) {\n    comment {\n      ...CommentItemFragment\n      id\n    }\n  }\n}\n\nfragment CommentItemFragment on DiscussionComment {\n  id\n  body\n  author {\n    __typename\n    login\n    avatarUrl\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  createdAt\n}\n"
  }
};
})();

(node as any).hash = "8cbea03a34bf6c435c74955f368abb4b";

export default node;
