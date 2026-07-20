import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "tochukwu-nwosa-blog",
  title: "Tochukwu Nwosa – Blog",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool(), codeInput()],
  schema: {
    types: schemaTypes,
  },
  form: {
    components: {
      portableText: {
        plugins: (props) => {
          return props.renderDefault({
            ...props,
            plugins: {
              ...props.plugins,
              markdown: {
                enabled: true,
              },
            },
          });
        },
      },
    },
  },
});
