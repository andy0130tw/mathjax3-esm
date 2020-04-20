# mathjax3-esm
(partial) ES Module builds for MathJax 3.

```diff
diff --git a/tsconfig.json b/tsconfig.json
index d75103a6..077453b5 100644
--- a/tsconfig.json
+++ b/tsconfig.json
@@ -3,7 +3,7 @@
   "compilerOptions": {
     "target": "ES5",
     "downlevelIteration": true,
-    "module": "commonjs",
+    "module": "es6",
     "declaration": true,
     "noImplicitAny": true,
     "removeComments": true,
```
