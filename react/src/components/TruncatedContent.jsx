export const TruncatedContent = ({ content, maxLength }) => {
  const plainText = content.replace(/<[^>]*>/g, "");
  const truncatedText =
    plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;

  return <div dangerouslySetInnerHTML={{ __html: truncatedText }} />;
};
