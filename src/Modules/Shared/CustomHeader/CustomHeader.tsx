import { Box, Button, Divider, Typography } from "@mui/material";

interface CustomHeaderProps {
  title: string;
  subTitle: string;
  buttonText?: string; // علامة ? تعني أنه اختياري
  onButtonClick?: () => void; // علامة ? تعني أنه اختياري
}

export default function CustomHeader({
  title,
  subTitle,
  buttonText,
  onButtonClick,
}: CustomHeaderProps) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          py: 2,
          mb: 2,
          mt: 4,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#1E2640",
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
              mt: 0.5,
            }}
          >
            {subTitle}
          </Typography>
        </Box>

        {/* لن يتم رندر الزرار إلا إذا قمت بتمرير buttonText */}
        {buttonText && (
          <Button
            variant="contained"
            onClick={onButtonClick}
            sx={{
              bgcolor: "#2442CB",
              color: "#fff",
              textTransform: "none",
              fontWeight: 700,
              px: 4,
              py: 1.2,
              borderRadius: "8px",
              boxShadow: "none",
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                // تعديل بسيط هنا لتصحيح الـ hover في mui
                bgcolor: "#1E36A8",
                boxShadow: "none",
              },
            }}
          >
            {buttonText}
          </Button>
        )}
      </Box>
      <Divider sx={{ mb: 2 }} />
    </>
  );
}
