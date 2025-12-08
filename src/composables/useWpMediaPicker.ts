export interface WPMediaAttachment {
  id: number;
  url: string;
  filename?: string;
  alt?: string;
  title?: string;
  mime?: string;
  subtype?: string;
  type?: string;
  [key: string]: any;
}

export interface WPMediaPickerOptions {
  title?: string;
  multiple?: boolean;
  type?: string | string[]; // image | video | application | etc.
}

declare const wp: any; // WP global from WordPress admin

export function useWpMediaPicker(userOptions: WPMediaPickerOptions = {}) {
  if (typeof wp === "undefined" || !wp.media) {
    console.warn("wp.media is not available. Ensure wp_enqueue_media() is loaded.");
    return {
      open: (_cb: (files: WPMediaAttachment[]) => void) => {},
    };
  }

  const defaultOptions = {
    title: "Select Media",
    multiple: false,
    library: {
      type: userOptions.type || "image",
    },
  };

  const open = (onSelect: (files: WPMediaAttachment[]) => void) => {
    const frame = wp.media({
      ...defaultOptions,
      ...userOptions,
    });

    frame.on("select", () => {
      const files: WPMediaAttachment[] = frame.state().get("selection").toJSON();
      onSelect(files);
    });

    frame.open();
  };

  return { open };
}
