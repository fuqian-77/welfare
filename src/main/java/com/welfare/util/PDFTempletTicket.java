//package com.welfare.util;
//
//import java.io.ByteArrayOutputStream;
//import java.io.File;
//
//public class PDFTempletTicket {
//    private String templatePdfPath;
//    private String ttcPath;
//    private String targetPdfpath;
//    private Advisory advisory;
//
//    public PDFTempletTicket() {
//        super();
//    }
//
//    public PDFTempletTicket(String templatePdfPath, String ttcPath,
//                            String targetPdfpath, Advisory advisory) {
//        this.templatePdfPath = templatePdfPath;
//        this.ttcPath = ttcPath;
//        this.targetPdfpath = targetPdfpath;
//        this.advisory = advisory;
//    }
//
//    public void templetTicket(File file) throws Exception {
//        PdfReader reader = new PdfReader(templatePdfPath);
//
//        ByteArrayOutputStream bos = new ByteArrayOutputStream();
//        PdfStamper ps = new PdfStamper(reader, bos);
//
//        AcroFields s = ps.getAcroFields();
//
//        s.setField("address", advisory.getAddress());
//        s.setField("advisoryName", advisory.getAdvisoryName());
//        s.setField("advisoryPhone", advisory.getAdvisoryPhone());
//        s.setField("oldName", advisory.getOldName());
//        s.setField("receptionist", advisory.getReceptionist());
//
//        ps.setFormFlattening(true);
//        ps.close();
//
//        FileOutputStream fos = new FileOutputStream(file);
//        fos.write(bos.toByteArray());
//        fos.close();
//    }
//
//    /**
//     * @return the templatePdfPath
//     */
//    public String getTemplatePdfPath() {
//        return templatePdfPath;
//    }
//
//    /**
//     * @param templatePdfPath
//     *            the templatePdfPathto set
//     */
//    public void setTemplatePdfPath(String templatePdfPath) {
//        this.templatePdfPath = templatePdfPath;
//    }
//
//    /**
//     * @return the ttcPath
//     */
//    public String getTtcPath() {
//        return ttcPath;
//    }
//
//    /**
//     * @param ttcPath
//     *            the ttcPath to set
//     */
//    public void setTtcPath(String ttcPath) {
//        this.ttcPath = ttcPath;
//    }
//
//    /**
//     * @return the targetPdfpath
//     */
//    public String getTargetPdfpath() {
//        return targetPdfpath;
//    }
//
//    /**
//     * @param targetPdfpath
//     *            the targetPdfpath toset
//     */
//    public void setTargetPdfpath(String targetPdfpath) {
//        this.targetPdfpath = targetPdfpath;
//    }
//
//    /**
//     * @return the ticket
//     */
//    public Advisory getAdvisory() {
//        return advisory;
//    }
//
//    /**
//     * @param ticket
//     *            the ticket to set
//     */
//    public void setAdvisory(Advisory advisory) {
//        this.advisory = advisory;
//    }
//
//
//}
